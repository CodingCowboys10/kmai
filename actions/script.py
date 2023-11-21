import argparse
import re
import os
import sys
from datetime import date

hline = "\n    \\hline\n    "
sep = ' & '

contributors = {
    "Lake020" : "Leonardo Lago",
    "andreacecchin" : "Andrea Cecchin",
    "GiovanniMenon" : "Giovanni Menon",
    "checco296": "Francesco Ferraioli",
    "MarcoDolzan01" : "Marco Dolzan",
    "AnnaNordio" : "Anna Nordio",
    "Fgiacomuzzo" : "Francesco Giacomuzzo",
    "" : ""
}

def parser_init():
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--filechanged", type=str)
    parser.add_argument("-a", "--author", type=str)
    parser.add_argument("-r", "--reviser", type=str)
    parser.add_argument("-c", "--comment", type=str)
    parser.add_argument('--approve', action='store_true')
    parser.add_argument('--no-approve', dest='approve', action='store_false')
    parser.set_defaults(approve=False)
    args = parser.parse_args()
    author = contributors[args.author]
    reviser = contributors[args.reviser]
    comment = args.comment
    approve = args.approve
    return args, author, reviser, comment, approve

def directory_list(args) :
    filechanged = args.filechanged.split()
    directory = set()
    for f in filechanged:
        d = re.search(r'([\w\d/-]*/)[\d\w-]*\.tex', f)
        if d :
            directory.add(d.group(1))
    return directory

def build_ver(data, approve, headlog):
    num = ""
    lines = data.splitlines()
    for l in range(len(lines)) :
        if headlog in lines[l]:
            num = re.search('(\d+)\.(\d+)', lines[l+2])
            break
    if approve and num:
        ver = str(int(num.group(1)) + 1) + ".0"
    elif num :
        ver = num.group(1) + "." + str(int(num.group(2)) + 1)
    else :
        ver = "0.1"
    return ver

def github_output(runned):
    name = 'runned'
    try:
        with open(os.environ['GITHUB_OUTPUT'], 'a') as fh:
            print(f'{name}={runned}', file=fh)
    except KeyError: 
        pass

def main():

    args, author, reviser, comment, approve = parser_init()
    directory = directory_list(args)

    runned = False
    for dire in directory:
        ver = ""
        filename = dire + "log.tex"
        try:
            with open(filename, 'r') as file:
                data = file.read()
            headlog = ""
            if "\\endhead" in data:
                headlog = "\\endhead"
            else:
                headlog = "\\rowcolor{headerrow} \\textbf{\\textcolor{white}{Versione}} & \\textbf{\\textcolor{white}{Data}} & \\textbf{\\textcolor{white}{Autori}} & \\textbf{\\textcolor{white}{Verificatori}} & \\textbf{\\textcolor{white}{Descrizione}} \\\\"
            
            ver = build_ver(data, approve, headlog)

            replace_str = headlog + hline + ver + sep + date.today().strftime("%Y/%m/%d") + sep + author + sep + reviser + sep + comment + '\\\\'
            newdata = data.replace(headlog, replace_str)

            if newdata != data:
                runned = True
                with open(filename, 'w') as file:
                    file.write(newdata)

        except FileNotFoundError:
            pass
        
        filename = dire + "frontespizio.tex"
        try:
            with open(filename, 'r') as file:
                data = file.read()
            str_to_replace_match = re.search(r"selectfont Versione \w+\.\w+", data)
            if str_to_replace_match:
                str_to_replace = str_to_replace_match.group()
                replace_front = "selectfont Versione " + ver
                newdata = data.replace(str_to_replace, replace_front)
                if newdata != data:
                    runned = True
                    with open(filename, 'w') as file:
                        file.write(newdata)

        except FileNotFoundError:
            pass
        
    github_output(runned)

if __name__ == "__main__" :
    sys.exit(main())
