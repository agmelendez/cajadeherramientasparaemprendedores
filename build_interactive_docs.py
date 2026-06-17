import os
import re

# Folders to process
folders = ['rubricas', 'templates', 'politicas']

# Base HTML template
BASE_TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__ - Caja de Herramientas IA</title>
    <link rel="stylesheet" href="../document-styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <nav class="top-navbar">
        <a href="../index.html" class="back-btn">
            <i class="fas fa-arrow-left"></i> Volver al Inicio
        </a>
        <div class="navbar-brand">
            <i class="fas fa-graduation-cap"></i> UCR | Caja de Herramientas de IA para MiPYMES
        </div>
    </nav>

    <div class="doc-wrapper">
        <div class="doc-card">
            __CONTENT__
        </div>
    </div>

    <div class="action-panel">
        __ACTION_BUTTONS__
        <button id="print-btn" class="btn btn-primary"><i class="fas fa-print"></i> Guardar / Imprimir PDF</button>
        <button id="reset-btn" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Limpiar Respuestas</button>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const docId = window.location.pathname.split('/').pop().replace('.html', '');
            
            // Auto-grow textareas
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach(ta => {
                const autoGrow = () => {
                    ta.style.height = 'auto';
                    ta.style.height = ta.scrollHeight + 'px';
                };
                ta.addEventListener('input', autoGrow);
                // Initial size adjustment
                setTimeout(autoGrow, 100);
            });

            // Load/Save inputs from LocalStorage
            const inputs = document.querySelectorAll('.interactive-input, .inline-input, input[type="checkbox"]');
            inputs.forEach((input, index) => {
                const key = `ucr-caja-${docId}-input-${index}`;
                const saved = localStorage.getItem(key);
                if (saved !== null) {
                    if (input.type === 'checkbox') {
                        input.checked = saved === 'true';
                    } else {
                        input.value = saved;
                        // Trigger input event to resize textarea
                        if (input.tagName === 'TEXTAREA') {
                            setTimeout(() => {
                                input.style.height = 'auto';
                                input.style.height = input.scrollHeight + 'px';
                            }, 100);
                        }
                    }
                }
                
                input.addEventListener('input', () => {
                    const val = input.type === 'checkbox' ? input.checked : input.value;
                    localStorage.setItem(key, val);
                });
            });

            // Interactive Rubrics Selection
            const rubricCells = document.querySelectorAll('.rubric-table td.rubric-cell');
            rubricCells.forEach(cell => {
                const rowIdx = cell.parentElement.rowIndex;
                const key = `ucr-caja-${docId}-rubric-row-${rowIdx}`;
                
                // Load saved selection
                const savedCol = localStorage.getItem(key);
                if (savedCol !== null && parseInt(savedCol) === cell.cellIndex) {
                    cell.classList.add('selected-level');
                }

                cell.addEventListener('click', () => {
                    cell.parentElement.querySelectorAll('td.rubric-cell').forEach(c => {
                        c.classList.remove('selected-level');
                    });
                    cell.classList.add('selected-level');
                    localStorage.setItem(key, cell.cellIndex);
                });
            });

            // Print Action
            document.getElementById('print-btn').addEventListener('click', () => {
                window.print();
            });

            // Reset Action
            document.getElementById('reset-btn').addEventListener('click', () => {
                if (confirm('¿Está seguro de que desea limpiar todas sus respuestas en este documento?')) {
                    inputs.forEach((input, index) => {
                        const key = `ucr-caja-${docId}-input-${index}`;
                        localStorage.removeItem(key);
                        if (input.type === 'checkbox') {
                            input.checked = false;
                        } else {
                            input.value = '';
                        }
                        if (input.tagName === 'TEXTAREA') {
                            input.style.height = 'auto';
                        }
                    });
                    
                    rubricCells.forEach(cell => {
                        cell.classList.remove('selected-level');
                    });
                    const rowCount = document.querySelectorAll('.rubric-table tr').length;
                    for(let i=0; i<rowCount; i++) {
                        localStorage.removeItem(`ucr-caja-${docId}-rubric-row-${i}`);
                    }
                }
            });

            // Export to Markdown Action
            const exportBtn = document.getElementById('export-btn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    let title = document.querySelector('h1').innerText;
                    let mdText = `# Trabajo Completado: ${title}\\n\\n`;
                    
                    // Simple export logic based on document type
                    if (document.querySelector('.bmc-grid')) {
                        // BMC Export
                        const cells = document.querySelectorAll('.bmc-cell');
                        cells.forEach(c => {
                            const header = c.querySelector('h3').innerText;
                            const val = c.querySelector('textarea').value || '(Vacío)';
                            mdText += `## ${header}\\n${val}\\n\\n`;
                        });
                    } else if (document.querySelector('.swot-grid')) {
                        // SWOT Export
                        const quadrants = document.querySelectorAll('.swot-quadrant');
                        quadrants.forEach(q => {
                            const header = q.querySelector('h3').innerText;
                            const val = q.querySelector('textarea').value || '(Vacío)';
                            mdText += `## ${header}\\n${val}\\n\\n`;
                        });
                    } else {
                        // General Template Export
                        const elements = document.querySelectorAll('.doc-card > *');
                        elements.forEach(el => {
                            if (el.tagName === 'H2') {
                                mdText += `## ${el.innerText}\\n\\n`;
                            } else if (el.tagName === 'H3') {
                                mdText += `### ${el.innerText}\\n\\n`;
                            } else if (el.tagName === 'P') {
                                // If paragraph contains inline inputs
                                let text = el.innerHTML;
                                const inputsInP = el.querySelectorAll('input, textarea');
                                if (inputsInP.length > 0) {
                                    inputsInP.forEach(inp => {
                                        text = text.replace(inp.outerHTML, `**${inp.value || '___'}**`);
                                    });
                                    // Remove html tags
                                    text = text.replace(/<[^>]*>/g, '');
                                    mdText += `${text}\\n\\n`;
                                } else {
                                    mdText += `${el.innerText}\\n\\n`;
                                }
                            } else if (el.tagName === 'UL' || el.tagName === 'OL') {
                                el.querySelectorAll('li').forEach(li => {
                                    let text = li.innerHTML;
                                    const inp = li.querySelector('input, textarea');
                                    if (inp) {
                                        if (inp.type === 'checkbox') {
                                            text = text.replace(inp.outerHTML, inp.checked ? '[x]' : '[ ]');
                                        } else {
                                            text = text.replace(inp.outerHTML, `**${inp.value || '___'}**`);
                                        }
                                    }
                                    text = text.replace(/<[^>]*>/g, '');
                                    mdText += `* ${text}\\n`;
                                });
                                mdText += '\\n';
                            }
                        });
                    }
                    
                    const blob = new Blob([mdText], { type: 'text/markdown;charset=utf-8;' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.setAttribute('download', `${docId}-completado.md`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });
            }
        });
    </script>
</body>
</html>
"""

def parse_markdown_to_html(md_text, filename, folder):
    lines = md_text.split('\n')
    html_content = []
    
    in_list = False
    list_type = None  # 'ul' or 'ol'
    in_table = False
    table_headers = []
    table_rows = []
    
    title = "Documento"
    
    # Check for custom layouts
    if filename == 'plantilla-foda.md':
        # Custom SWOT layout
        return get_swot_html()
    elif filename == 'plantilla-business-model-canvas.md':
        # Custom BMC layout
        return get_bmc_html()
        
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Check LaTeX
        if line.startswith('$$') and line.endswith('$$'):
            math_expr = line.replace('$$', '').replace(r'\\text', '').replace('{', '').replace('}', '').replace(r'\\times', '×').replace(r'\\frac', '')
            # Simple fallback formula display without LaTeX syntax
            clean_math = "Puntaje Total = Impacto × Viabilidad × Urgencia" if "Puntaje Total" in math_expr or "Impacto" in math_expr else math_expr
            html_content.append(f'<div class="info-box"><div class="info-box-title">Fórmula:</div><p style="font-family: monospace; font-size: 1.1rem; text-align: center; margin: 10px 0; font-weight: bold;">{clean_math}</p></div>')
            i += 1
            continue
            
        # Table Parsing
        if line.startswith('|') and i < len(lines):
            # Check if this is a table
            in_table = True
            table_header_line = line
            table_separator_line = lines[i+1].strip() if i+1 < len(lines) else ""
            
            if '|---|' in table_separator_line or '|---|---|' in table_separator_line or '| --- |' in table_separator_line:
                # We have a valid table!
                headers = [c.strip() for c in table_header_line.split('|')[1:-1]]
                rows = []
                
                # Advance past separator
                i += 2
                while i < len(lines) and lines[i].strip().startswith('|'):
                    row_cells = [c.strip() for c in lines[i].strip().split('|')[1:-1]]
                    rows.append(row_cells)
                    i += 1
                
                # Render table
                is_rubric = folder == 'rubricas'
                table_class = "rubric-table" if is_rubric else "normal-table"
                
                table_html = []
                table_html.append(f'<div class="table-responsive"><table class="{table_class}">')
                table_html.append('<thead><tr>')
                for h in headers:
                    table_html.append(f'<th scope="col">{clean_formatting(h)}</th>')
                table_html.append('</tr></thead><tbody>')
                
                for r_cells in rows:
                    table_html.append('<tr>')
                    for col_idx, cell in enumerate(r_cells):
                        cleaned_cell = clean_formatting(cell)
                        if is_rubric:
                            if col_idx == 0:
                                table_html.append(f'<td class="rubric-criterion">{cleaned_cell}</td>')
                            else:
                                table_html.append(f'<td class="rubric-cell">{cleaned_cell}</td>')
                        else:
                            # If it's a template table and empty, make it an input
                            if not cleaned_cell or cleaned_cell == '...' or cleaned_cell.strip() == '':
                                table_html.append('<td><input type="text" class="interactive-input" style="margin:0; padding:6px 10px;" placeholder="..."></td>')
                            else:
                                table_html.append(f'<td>{cleaned_cell}</td>')
                    table_html.append('</tr>')
                
                table_html.append('</tbody></table></div>')
                html_content.append('\n'.join(table_html))
                in_table = False
                continue
            else:
                # Not a table, just format it normally
                line = table_header_line
                
        # Close lists if empty line
        if not line:
            if in_list:
                html_content.append(f'</{list_type}>')
                in_list = False
                list_type = None
            i += 1
            continue
            
        # Parse list items
        is_bullet = line.startswith('* ') or line.startswith('- ')
        is_numbered = re.match(r'^\d+\.\s+', line)
        
        if is_bullet or is_numbered:
            item_type = 'ul' if is_bullet else 'ol'
            
            # Extract content
            if is_bullet:
                content_text = line[2:].strip()
            else:
                m = re.match(r'^\d+\.\s+(.+)$', line)
                content_text = m.group(1).strip() if m else line
                
            # If not in list, open one
            if not in_list:
                in_list = True
                list_type = item_type
                html_content.append(f'<{list_type}>')
            elif list_type != item_type:
                # Close previous and open new
                html_content.append(f'</{list_type}>')
                list_type = item_type
                html_content.append(f'<{list_type}>')
                
            # Check for check boxes
            if content_text.startswith('[ ]'):
                label_text = content_text[3:].strip()
                html_content.append(f'<li><label class="checkbox-container"><input type="checkbox"> <span>{clean_formatting(label_text)}</span></label></li>')
            else:
                # Check for input placeholders like ... or ______ in lists
                html_content.append(f'<li>{replace_placeholders(clean_formatting(content_text), filename)}</li>')
            
            i += 1
            continue
            
        # If in list but line is not a list item, close list
        if in_list and not (is_bullet or is_numbered):
            html_content.append(f'</{list_type}>')
            in_list = False
            list_type = None
            
        # Headings
        if line.startswith('# '):
            title = line[2:].strip()
            html_content.append(f'<h1>{clean_formatting(title)}</h1>')
        elif line.startswith('## '):
            html_content.append(f'<h2>{clean_formatting(line[3:].strip())}</h2>')
        elif line.startswith('### '):
            html_content.append(f'<h3>{clean_formatting(line[4:].strip())}</h3>')
        elif line.startswith('#### '):
            html_content.append(f'<h4>{clean_formatting(line[5:].strip())}</h4>')
        elif line == '---':
            html_content.append('<hr>')
        else:
            # Paragraph
            html_content.append(f'<p>{replace_placeholders(clean_formatting(line), filename)}</p>')
            
        i += 1
        
    # Close any open list at the end
    if in_list:
        html_content.append(f'</{list_type}>')
        
    return title, '\n'.join(html_content)

def clean_formatting(text):
    # Bold text
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', text)
    # Links
    text = re.sub(r'\[(.*?)\]\((.*?)\)', r'<a href="\2" target="_blank" rel="noopener noreferrer">\1</a>', text)
    return text

def replace_placeholders(text, filename):
    # If the file is a policy, do not add input fields!
    if filename.startswith('declaracion') or filename.startswith('gobernanza') or filename.startswith('politica') or filename.startswith('protocolo'):
        return text

    # For templates, replace placeholders like ... or ______ with input elements
    # Check if we have a short label and then underscores (like Firma: ____________)
    if '________________' in text or '_____' in text:
        # Replace the underscores with an inline text input
        text = re.sub(r'_{5,}', r'<div class="inline-input-container"><input type="text" class="inline-input" placeholder="..."></div>', text)
        
    # Replace ... at the end of text or inside text with a textarea or text input
    elif '...' in text:
        # If the line ends with ..., or is just a response field, let's make it a textarea
        # But if it's small, like Edad aproximada: ... we make it a text input
        if len(text) < 60 and any(keyword in text.lower() for keyword in ['edad', 'nombre', 'ubicación', 'fecha', 'plazo', 'responsable', 'precio', 'costo', 'valor', 'ganadora', 'recurso']):
            text = text.replace('...', '<div class="inline-input-container" style="min-width: 250px;"><input type="text" class="inline-input" placeholder="Escriba aquí..."></div>')
        else:
            text = text.replace('...', '<textarea class="interactive-input" placeholder="Escriba su respuesta aquí..."></textarea>')
            
    return text

def get_swot_html():
    title = "Plantilla: FODA Dinámico para MiPYME"
    content = """
    <h1>Plantilla: FODA Dinámico para MiPYME con Criterios de Priorización</h1>
    <p>El análisis FODA (Fortalezas, Oportunidades, Debilidades, Amenazas) te ayuda a entender la situación de tu negocio. Al utilizar IA para redactar o estructurar el FODA, clasifica cada punto para no confundir datos reales con meros supuestos.</p>
    
    <div class="info-box">
        <div class="info-box-title"><i class="fas fa-info-circle"></i> Clasificación de Criterios (Utilice estas etiquetas al redactar):</div>
        <ul>
            <li><strong>[D] Dato observado:</strong> Hecho verificado con información real del negocio (ej. estados financieros, encuestas).</li>
            <li><strong>[S] Supuesto:</strong> Hipótesis que parece lógica pero no ha sido validada.</li>
            <li><strong>[R] Recomendación de IA:</strong> Sugerencia hecha por el modelo que requiere revisión.</li>
        </ul>
    </div>
    
    <hr>
    
    <h2>1. Matriz FODA Dinámica</h2>
    <p>Rellene los cuadrantes clasificando sus observaciones internas (controlables) y externas (no controlables):</p>
    
    <div class="swot-grid">
        <div class="swot-quadrant fortalezas">
            <h3>💪 Fortalezas</h3>
            <p class="bmc-hint">Puntos fuertes internos (ej. [D] 15 años de experiencia, [R] base de datos de clientes).</p>
            <textarea class="interactive-input" placeholder="Escriba sus fortalezas aquí..." style="height: 150px;"></textarea>
        </div>
        <div class="swot-quadrant debilidades">
            <h3>⚠️ Debilidades</h3>
            <p class="bmc-hint">Puntos débiles internos a corregir (ej. [S] bajo alcance digital, [D] sin control de inventarios).</p>
            <textarea class="interactive-input" placeholder="Escriba sus debilidades aquí..." style="height: 150px;"></textarea>
        </div>
        <div class="swot-quadrant oportunidades">
            <h3>🚀 Oportunidades</h3>
            <p class="bmc-hint">Tendencias externas a aprovechar (ej. [D] alta demanda de entrega a domicilio, [R] nicho sin explotar).</p>
            <textarea class="interactive-input" placeholder="Escriba sus oportunidades aquí..." style="height: 150px;"></textarea>
        </div>
        <div class="swot-quadrant amenazas">
            <h3>⚡ Amenazas</h3>
            <p class="bmc-hint">Riesgos externos a mitigar (ej. [D] nuevo competidor local, [S] aumento de costos de servicios).</p>
            <textarea class="interactive-input" placeholder="Escriba sus amenazas aquí..." style="height: 150px;"></textarea>
        </div>
    </div>
    
    <hr>
    
    <h2>2. Plan de Acción Inicial</h2>
    <p>Derivado de la matriz anterior, seleccione las 3 acciones más urgentes y justifíquelas:</p>
    
    <ol>
        <li>
            <strong>Acción 1:</strong>
            <input type="text" class="interactive-input" placeholder="Acción concreta">
            <textarea class="interactive-input" placeholder="¿Por qué? (Justificación basada en FODA)" style="height: 60px;"></textarea>
        </li>
        <li>
            <strong>Acción 2:</strong>
            <input type="text" class="interactive-input" placeholder="Acción concreta">
            <textarea class="interactive-input" placeholder="¿Por qué? (Justificación basada en FODA)" style="height: 60px;"></textarea>
        </li>
        <li>
            <strong>Acción 3:</strong>
            <input type="text" class="interactive-input" placeholder="Acción concreta">
            <textarea class="interactive-input" placeholder="¿Por qué? (Justificación basada en FODA)" style="height: 60px;"></textarea>
        </li>
    </ol>
    """
    return title, content

def get_bmc_html():
    title = "Plantilla: Business Model Canvas Socrático"
    content = """
    <h1>Plantilla: Business Model Canvas Socrático con IA</h1>
    <p>El Business Model Canvas permite visualizar en una sola hoja la estructura de tu modelo de negocio. Esta plantilla socrática te ayuda a cuestionar tus supuestos con preguntas desafiantes antes de considerarlos verdaderos.</p>
    
    <div class="bmc-grid">
        <div class="bmc-cell bmc-alliances">
            <h3>🤝 Socios Clave</h3>
            <p class="bmc-hint">¿Quiénes son nuestros socios y proveedores clave? <strong>Supuesto a Validar:</strong> ¿Qué riesgos operativos o de propiedad intelectual asumimos?</p>
            <textarea class="interactive-input" placeholder="Socios y proveedores clave..."></textarea>
        </div>
        <div class="bmc-cell bmc-activities">
            <h3>⚡ Actividades Clave</h3>
            <p class="bmc-hint">¿Qué acciones requiere nuestra propuesta de valor? <strong>Supuesto:</strong> ¿Cuáles se aceleran con IA y cuáles requieren criterio humano?</p>
            <textarea class="interactive-input" placeholder="Actividades clave de producción, canales, etc..."></textarea>
        </div>
        <div class="bmc-cell bmc-resources">
            <h3>🔧 Recursos Clave</h3>
            <p class="bmc-hint">¿Qué activos requiere el negocio? <strong>Supuesto:</strong> ¿Dependemos de una IA de terceros que pueda cambiar tarifas?</p>
            <textarea class="interactive-input" placeholder="Físicos, humanos, de IA, intelectuales..."></textarea>
        </div>
        <div class="bmc-cell bmc-propositions">
            <h3>💎 Propuestas de Valor</h3>
            <p class="bmc-hint">¿Qué necesidad resolvemos? <strong>Supuesto a Validar:</strong> ¿Qué alternativas usa el cliente hoy y por qué cambiaría?</p>
            <textarea class="interactive-input" placeholder="Propuesta de valor única del negocio..."></textarea>
        </div>
        <div class="bmc-cell bmc-relations">
            <h3>❤️ Relaciones con Clientes</h3>
            <p class="bmc-hint">¿Cómo interactuamos? <strong>Supuesto:</strong> ¿Es viable automatizar (chatbots) sin perder calidez?</p>
            <textarea class="interactive-input" placeholder="Tipo de relación: personal, autoservicio, automatizada..."></textarea>
        </div>
        <div class="bmc-cell bmc-channels">
            <h3>🚀 Canales</h3>
            <p class="bmc-hint">¿Cómo los alcanzamos? <strong>Supuesto:</strong> ¿Son realmente costo-eficientes y usados por el target?</p>
            <textarea class="interactive-input" placeholder="Distribución, ventas, comunicación..."></textarea>
        </div>
        <div class="bmc-cell bmc-segments">
            <h3>👥 Segmentos de Clientes</h3>
            <p class="bmc-hint">¿Para quién creamos valor? <strong>Supuesto a Validar:</strong> ¿Cómo sabemos que este segmento realmente tiene el problema?</p>
            <textarea class="interactive-input" placeholder="Segmentos de mercado objetivo..."></textarea>
        </div>
        <div class="bmc-cell bmc-costs">
            <h3>💰 Estructura de Costos</h3>
            <p class="bmc-hint">¿Costos más importantes? <strong>Supuesto:</strong> ¿El costo tecnológico mensual es sostenible en equilibrio?</p>
            <textarea class="interactive-input" placeholder="Costos fijos, variables, licencias..."></textarea>
        </div>
        <div class="bmc-cell bmc-revenues">
            <h3>💳 Fuentes de Ingresos</h3>
            <p class="bmc-hint">¿Por qué valor pagan? <strong>Supuesto:</strong> ¿Nuestros precios cubren el costo de adquisición?</p>
            <textarea class="interactive-input" placeholder="Ventas directas, suscripción, pasarelas..."></textarea>
        </div>
    </div>
    """
    return title, content

def run():
    for folder in folders:
        if not os.path.exists(folder):
            print(f"Folder {folder} not found, skipping.")
            continue
            
        print(f"Processing folder: {folder}")
        for filename in os.listdir(folder):
            if filename.endswith('.md'):
                md_path = os.path.join(folder, filename)
                html_filename = filename.replace('.md', '.html')
                html_path = os.path.join(folder, html_filename)
                
                print(f"  Reading {filename} -> Generating {html_filename}")
                with open(md_path, 'r', encoding='utf-8') as f:
                    md_text = f.read()
                    
                title, parsed_content = parse_markdown_to_html(md_text, filename, folder)
                
                # Check action buttons based on document type
                action_buttons = ""
                if folder == 'templates':
                    action_buttons = '<button id="export-btn" class="btn btn-secondary"><i class="fas fa-file-download"></i> Exportar Trabajo (.md)</button>'
                
                # Render base template
                final_html = BASE_TEMPLATE.replace('__TITLE__', title).replace('__CONTENT__', parsed_content).replace('__ACTION_BUTTONS__', action_buttons)
                
                # Write file in UTF-8
                with open(html_path, 'w', encoding='utf-8') as f:
                    f.write(final_html)
                    
    print("All documents processed successfully!")

if __name__ == '__main__':
    run()
