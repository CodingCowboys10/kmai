import re
import os

glossary = list()
singolare=list()
plurale=list()
currentDirectory = os.environ['CURRENT_DIRECTORY']
glossarioPath = os.environ['GLOSSARIO_PATH']
def build_file_path_letters(): #prende tutti i file delle lettere e salva in una lista i vari path

    fp=list()
    for (files) in os.walk(glossarioPath, topdown=True): #path directory dove si trovano i file del glossario
        for n in range(len(files[2])):
            match = re.search(r'lettera([\w]).tex', files[2][n])
            if match:
                path=glossarioPath+"lettera"+match.group(1)+".tex" #path directory dove si trovano i file tipo lettera del glossario
                fp.append(path)

    return fp

def build_gloss(file_path): #scorre tutti i path dei files lettera#.tex, prende i titoli delle sezioni e li mette nella lista del glossario

    for fp in file_path:
        with open(fp, 'r') as file:
            for line in file:
                match = re.search(r'\\section{([\w\d\.\s\'-\\]*)}', line)
                match_label = re.search(r'\\label{sec:([\w\d\.\s\'-\\]*)}', line)
                if match:
                    word=match.group(1)
                    if '\\' in word:
                        word=word.replace("\\", "")
                    singolare.append(word)
                    if match_label:
                        plural=match_label.group(1)
                        plurale.append(plural)
                    else:
                        plurale.append("")
    glossary.append(list(zip(singolare,plurale)))
    return glossary

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

def remove_g(f): #rimuove eventuali g presenti nei documenti prima della compilazione in modo da uniformare tutto

    emph=r'\\emph{([\w\d\.\s\'-\\]*)\\ped{G}}' #giusto per essere sicuri che qualsiasi cosa che non è ccgloss è tolta
    ccgloss=r'\\ccgloss{([\w\d\.\s\'-\\]*)}'
    with open(f, 'r+') as file:
        content = file.read()
        match_emph = re.findall(emph, content)
        match_ccgloss = re.findall(ccgloss, content)

        for n in range(len(match_emph)):
            word_to_remove = match_ccgloss[n]
            if word_to_remove != "":
                content=content.replace("\\emph{"+match_emph[n]+"\\ped{G}}", match_emph[n])
        for n in range(len(match_ccgloss)):
            word_to_remove = match_ccgloss[n]
            if word_to_remove != "":
                content=content.replace("\\ccgloss{"+match_ccgloss[n]+"}", match_ccgloss[n])
    
        file.seek(0)
        file.write(content)
        file.truncate() 
        file.close   

def add_g(f): #cerca nel testo di ogni file le parole del glossario, alla prima occorenza le salva in una lista, elimina la coppia singolare-plurale dal glossario e poi sostituisce nel content prendendo dalla lista

    global glossary
    with open(f, 'r+') as file:
        content = file.read()
        matches = set()
        already_changed = []
        words_in_content = re.findall(r'\b[\w-]+\b', content)
        max_words=get_max_spaces(glossary)

        for i, _ in enumerate(words_in_content):
            for j in range(i, min(i + max_words, len(words_in_content))): #cercando parola per parola, termini come "way of working" (composti da più parole) non matchano mai, così cerca anche per blocchi di parole composti al massimo da tante parole quante quelle del il termine composto da più parole in glossario
                current_term = ' '.join(words_in_content[i:j + 1])
                for word_tuple in glossary:
                        for word in word_tuple:
                            for n in range(2):  
                                if word not in already_changed and current_term.lower() == word[n].lower():                                 
                                    matches.add(current_term)
                                    already_changed.append(word)                                
                                    remove_from_gloss(word)

        for match in matches:     
            replacement = "\\ccgloss{" + match + "}"
            content = content.replace(match, replacement, 1) #sostituisce la prima occorenza di match con la versione \ccgloss
        
        file.seek(0)
        file.write(content)
        file.truncate()
        file.close()

def get_max_spaces(glossario): #cerca quale termine del glossario è composto da più parole in assoluto per poi cercare a gruppi di max quel n di parole nel testo

    max_spaces = 0
    for word_tuple in glossario:
        for word in word_tuple:
            for n in range(2):
                spaces_count = word[n].count(' ')
                max_spaces = max(max_spaces, spaces_count)
    return max_spaces + 1

def remove_from_gloss(word_tup): #elimina dal glossario la tupla che contiene un termine trovato 

    for glossary_tuple in glossary:
                for tup in glossary_tuple:
                    if tup==word_tup:
                        glossary_tuple.remove(tup)        
                
def main():
    
    file_path=list()
    file_path=build_file_path_letters()
    build_gloss(file_path)
    glossify()

if __name__ == "__main__":
    main()
