# Dados passados via linha de comando
#raio = 1 # inicialização da variavel do Raio
listaInicial = [0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1]
#rule = 30
listaFinal = []

raio = int(input('Introduza o raio [1/2/3]: '))
rule = int(input('Introduza a regra: '))
numberRepeats = int(input('Quantas vezes pretendem repetir: '))
#listaInicial = input('Introduza a lista inicial: ').split(",")

n = 2 * raio + 1
tamList = 0
t = 0

# função para converter de decimal para binário
def dectobin(r):
    return bin(r)[2:].zfill(2 ** n)

# função para inverter a lista
def reverselist(reverse):
    return reverse[::-1]

# função para converter de binário para decimal
def bintodec(b):
    number = 0
    counter = 0
    for i in b[::-1]:  # Iterating through b in reverse order
        number += int(i) * (2 ** counter)
        counter += 1
    return number


#regraList = reverselist(dectobin(rule))
def getvalueonrule(regraList, position):
    return regraList[position]


def neighborhood(iterable):
    iterator = iter(iterable)
    prev_item = iterable[len(iterable)-1]
    current_item = next(iterator)  # throws StopIteration if empty.
    for next_item in iterator:
        yield (prev_item, current_item, next_item)
        prev_item = current_item
        current_item = next_item
    yield (prev_item, current_item, iterable[len(iterable)-len(iterable)])


def update(listaInicial, rule, raio, number):
    regraList = reverselist(dectobin(rule))
    addzero = str("%0") + str(n) + str("d")  # acrescentar zeros antes do valor para formar o tamanho total
    for x in range(0, number):
        for prev,item,next in neighborhood(listaInicial):
            #addzero = str("%0") + str(n) + str("d")  # acrescentar zeros antes do valor para formar o tamanho total
            listaFinal.append(getvalueonrule(regraList, bintodec(addzero % int(str(prev) + str(item) + str(next)))))
            print(addzero % int(str(prev) + str(item) + str(next)))

        print(''.join(listaFinal[i] for i in range(0, len(listaFinal))))
        del listaInicial[:]
        listaInicial = list(listaFinal)
        del listaFinal[:]

        #print(''.join(listaFinal[i] for i in listaFinal))


update(listaInicial, rule, raio, numberRepeats)