function criaCalculadora() {
    return {
        display: document.querySelector('.display'),
        inicia(){
            this.cliqueBotoes()
        },
        clearDisplay() {
            this.display.value = ''
        },
        fazCalculo(){
            let conta = this.display.value

            try {
                conta = eval(conta)

                if (!conta) {
                    alert('Conta inválida!')
                    return
                }

                this.display.value = conta
            } catch (error) {
                alert('Conta inválida!')
                return 
            }            
        },
        apagaUm() {
            this.display.value = this.display.value.slice(0, -1)
        },
        cliqueBotoes() {
            document.addEventListener('click', e => {
                const el = e.target

                if (el.classList.contains('btn-num')) {
                    this.btnParaDisplay(el.innerText)
                } else if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                } else if (el.classList.contains('btn-del')) {
                    this.apagaUm();
                } else if (el.classList.contains('btn-eq')) {
                    this.fazCalculo();
                }
            })
        },
        btnParaDisplay(valor) {
            this.display.value += valor
        }
    }
}

const calculadora = criaCalculadora();
calculadora.inicia()