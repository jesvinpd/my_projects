import os
from PyPDF2 import PdfReader, PdfWriter

def split_pdf(input_path, output_dir, m):
    reader = PdfReader(input_path)
    total_pages = len(reader.pages)
    
    # Calculate how many parts we will have
    n = (total_pages + m - 1) // m  # Ceiling division
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for i in range(n):
        writer = PdfWriter()
        start = i * m
        end = min(start + m, total_pages)
        
        for j in range(start, end):
            writer.add_page(reader.pages[j])
        
        output_path = os.path.join(output_dir, f'part_{i + 1}.pdf')
        with open(output_path, 'wb') as f_out:
            writer.write(f_out)

        print(f'Created: {output_path} ({end - start} pages)')

# Example usage
input_pdf = "./Aho A.V., Ravi Sethi and D. Ullman. Compilers – Principles Techniques and Tools (1).pdf"       # Replace with your PDF file
output_folder = "./output_parts"
pages_per_part = 100           # Set how many pages per part you want

split_pdf(input_pdf, output_folder, pages_per_part)
