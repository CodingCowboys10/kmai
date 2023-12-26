import re
import os

glossario = list()
currentDirectory='/home/anna/Scrivania/Verbale 2023-12-04/' #directory dove si trova il file a cui mettere le g di glossario

def build_file_path_letters(): #prende tutti i file delle lettere e salva in una lista i vari path
    fp=list()
    for (files) in os.walk('/home/anna/Scrivania/Glossario/', topdown=True): 
        for n in range(len(files[2])):
            match = re.search(r'lettera([\w]).tex', files[2][n])
            if match:
                path="/home/anna/Scrivania/Glossario/lettera"+match.group(1)+".tex"
                fp.append(path)

    return fp

def build_gloss(file_path): #scorre tutti i path dei files lettera#.tex, prende i titoli delle sezioni e li mette nella lista del glossario

    for fp in file_path:
        with open(fp, 'r') as file:
            for line in file:
                match = re.search(r'\\section{([\w\d\.\s\'-\\]*)}', line)
                if match:
                    word=match.group(1)
                    if '\\' in word:
                        word=word.replace("\\", "")
                    glossario.append(word)
                    if word.lower() == "jira software": #caso specifico, o modifichiamo il glossario con jira soltanto o resta così
                        glossario.append("jira")
    return glossario

def glossify(): #va a inserire le G a pedice (qua lavoro su un verbale)
    input=list()
    for (files) in os.walk(currentDirectory, topdown=True): 
        for f in (files[2]):
            main = re.search('main.tex', f)
            cover = re.search('frontespizio.tex', f)
            log = re.search('log.tex', f)
            tex = re.search(r'([\w\d\.\s\'-\\]).tex', f)
            if main:
                path=currentDirectory+f
                inputFile=r'\\input{([\w\d\.\s\'-\\]*)}'
                with open(path, 'r+') as file:
                    content = file.read()
                    input = re.findall(inputFile, content) #mette in una lista ordinata sfruttando gli input nel main i file che compongono il documento
            if not main and not cover and not log and tex:
                path=currentDirectory+f
                remove_g(path)
    
    for n in range (len(input)):
        if input[n]!= "frontespizio" and input[n] !="log":
            path=currentDirectory+input[n]+".tex"

            add_g(path)
       
            
def add_g(f):
    with open(f, 'r+') as file:
        content = file.read()
        print('\n')
        match = re.compile(r'\b(?:' + '|'.join(re.escape(word) for word in glossario) + r')\b', re.IGNORECASE)
        matches = set()  # set per evitare duplicati

        for word in match.findall(content):
            if word.lower() not in matches:
                matches.add(word.lower())
                title_match = re.search(r'\\text\w{.*' + re.escape(word) + '.*}', content)
                
                if not title_match:
                    content = content.replace(word, "\\ccgloss{" + word + "}", 1)
                if word.upper() in glossario:
                    glossario.remove(word.upper()) 
                elif word.capitalize() in glossario: 
                        glossario.remove(word.capitalize()) 
                if word.lower() == "jira" and "jira software" in glossario: #sempre caso specifico
                        glossario.remove("jira software")
        print(content)
        # Scrivi il contenuto modificato nel file
        file.seek(0)
        file.write(content)
        file.truncate()   
        file.close

def remove_g(f): #rimuove eventuali g presenti nei documenti prima della compilazione in modo da uniformare tutto

    emph=r'\\emph{([\w\d\.\s\'-\\]*)\\ped{G}}' #giusto per essere sicuri che qualsiasi cosa che non è ccgloss è tolta
    ccgloss=r'\\ccgloss{([\w\d\.\s\'-\\]*)}'
    with open(f, 'r+') as file:
        content = file.read()
        match_emph = re.findall(emph, content)
        match_ccgloss = re.findall(ccgloss, content)

        for n in range(len(match_emph)):
            content=content.replace("\\emph{"+match_emph[n]+"\\ped{G}}", match_emph[n])
        for n in range(len(match_ccgloss)):
            content=content.replace("\\ccgloss{"+match_ccgloss[n]+"}", match_ccgloss[n])
        
        file.seek(0)
        file.write(content)
        file.truncate()   
        file.close

            

                
def main():
    
    file_path=list()
    file_path=build_file_path_letters()
    build_gloss(file_path)
    glossify()


if __name__ == "__main__":
    main()

