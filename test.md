# Estruturas Condicionais

As estruturas condicionais são estruturas que podem modificar o rumo do nosso programa, definindo se ele vai fazer alguma coisa ou outra coisa, teste este código em sua máquina:

```ruby
idade = 20

if idade >= 18
    puts "Você é maior de idade!"
end

if idade < 18
    puts "Você é menor de idade!"
end
```

Irá aparecer como resultado: `Você é maior de idade!`, pois definimos a variável idade sendo 20, e na terceira linha, há um **if**, que será usado para criarmos a estrutura condicional, sempre que colocarmos um **if** precisamos colocar um end no final da condição, expressando que ela acabou e pularmos uma identação, que pode ser feita apertando a tecla TAB do seu teclado, no código acima temos duas condicionais, uma que testa se a idade é maior ou igual á 18, e outra que testa se a idade é menor que 18, dessa maneira que funciona as estruturas condicionais, caso a condição seja executada, ela será verdadeira (true), se não será falsa (false).

## Else

Caso nenhuma condição se torne verdadeira, o else será chamado, else significa "se não", assim, se nenhuma condição seja verdadeira, o else será executado.

```ruby
nome = "Maria"

if nome == "Maria"
    puts "Seu nome é Maria!"

else
    puts "Seu nome não é Maria!"
end
```

No exemplo acima, se o nome for "Maria", uma ação será executada, se não for "Maria" uma outra ação será executada, lembrando que o else tem que estar dentro do if, antes do end.

## Else if

O Else If funciona da seguinte maneira, se a condição ser falsa, irá ter uma outra condição, e se esta condição ser falsa, o else normal será executado, mas se a primeira condição citada ser verdadeira, as duas depois dela não serão nem mesmo testadas, Exemplo:

```ruby
nome = "João"

if nome == "Maria"
   puts "Seu nome é Maria!"

elsif nome == "João"
   puts "Seu nome é João!"

else
   puts "Seu nome não é João nem Maria!"
end
```

Como pode se ver no código acima, caso o nome seja "Maria" algo será feito, caso não seja, se for "João" outro algo será feito, e caso não seja nenhum dos dois, nenhum será feito, experimente mudar o nome para Maria e outros nomes e Strings.

## Case

Mas e se em alguma situação for necessário testar se uma variável tem vários valores diferentes? com o If e elseif escrever o código pode ser lento e chato, e para isso temos o **Case**.

```ruby
lugar_preferido = "Casa"

case lugar_preferido

when "Shopping"
    puts "Adora fazer compras e o ambiente do Shopping né?"

when "Casa"
    puts "Adora o conforto da sua casa certo?"

when "Restaurante"
    puts "Adora comer em um restaurante correto?"

else
    puts "Seu lugar não tem comentário."
end
```

Como podemos ver no código acima, estamos fazendo um case (caso) no lugar_preferido, e cada when (quando) determina algo que será feito se o lugar preferido tiver um valor específico, busque mudar o valor do lugar preferido para ver o que acontece.

## Proximo =>

[Input do Usuário](../input-usuario/README.md)
