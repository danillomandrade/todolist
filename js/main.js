
// const -> vamos usar ele mais vezes do que o let, só vamos usa ro LET quando a variavel realmente precisar ser alterada.
//é uma boa pratica de programação funcional


const Main = { //esta com letra MAIUSCULA pois é o OBJETO PRINCIPAL da nossa apliação. Cada "componente" pode ter um controlador diferente
  
    init: function(){ 
        this.cacheSelectors()
        this.bindEvents()

    },//responsavel por iniciar a coisa toda, fazer o cache dos selectors.
    //para chamar o cacheSelectors, tenho que informar que ele sta dentro do Main, utilizando a expressao this.

    cacheSelectors: function(){ 
        this.$checkButtons = document.querySelectorAll('.check') 
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')

    },//responsavel por selecionar elementos do HTML e armazenar eles em uma variavel. Cria as variaveis.
    //toda variavel que for armazenar algum elemento HTML deve começar com $, é uma boa pratica
    //aqui estou usando o this. pois ele vai criar esta variavel para todas as outras funções que tambem precisariam utilizar esta variavel.
 
    bindEvents: function(){ 
        const self = this
        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click 
        })

        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this) //o objetivo do .bind(this) é levar o this deste contexto para a função desejada neste caso a do keypress (ver linha 52)

        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click
        })
       
    },
    //aqui nao usamos o this pois o contexto dele é o window e nao o Main. para Solucionar podemos fazer o seguinte: chamamos uma ocnstante de qualquer nome e apontamos ela par ao this, para que ele consiga enxergar o contexto correto (MAIN)
    //responsavel por adicionar eventos de clique, teclas pressionadas etc, nos elementos que selecionamos ele no cacheSelector
    //como temos mais de um botão na tela, precisamos criar um loop para percorrer os itens e adicionar eles este evento (forEach) e aplicando a função inserida em cada um.


    Events: { 
        checkButton_click: function(e){
            const li = e.target.parentElement

            //metodo para ajudar a verificar se existe tal classe dentro do classLIst, para saber se ja tem a classe la ou nao
            const isDone = li.classList.contains('done')

            if(isDone) {
                li.classList.remove('done')
            }else{
            li.classList.add('done')
            }
        },

        inputTask_keypress: function(e){ //dentro de uma função de evento (seja ele qual for) o THIS sempre sera o proprio elemento que foi adicionado ao evento, neste caso o HTML 
            const key = e.key
            const value = e.target.value
            
            if (key === 'Enter' || key === 'NumpadEnter'){
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                        ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                e.target.value = ''

                this.cacheSelectors()
                this.bindEvents()
            }
            
        },

        removeButton_click: function (e){
            let li = e.target.parentElement

            li.classList.add('removed')

            setTimeout (function (){
                li.classList.add('hidden')
            },300)
        }
    }
    //aqui vou colocar todas as funções relacionadas a eventos , deixando elas separadas, mais organizado e facil de dar manutenção.

}

Main.init()