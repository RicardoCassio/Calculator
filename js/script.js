function createCalculator() {
    return {
        display: document.querySelector('.display'),

        init(){
            this.clickButtons()
            this.pressKey()
        },

        clearDisplay() {
            this.display.value = ''
        },

        runCalc() {
            let expression = this.display.value;

            try {
                const result = this.safeEval(expression);

                if (result === undefined || result === null) {
                    alert('Conta inválida!');
                    return;
                }

                this.display.value = result;
            } catch (error) {
                alert('Conta inválida!');
                return;
            }            
        },

        backSpace() {
            this.display.value = this.display.value.slice(0, -1)
        },

        clickButtons() {
            document.addEventListener('click', e => {
                const el = e.target

                if (el.classList.contains('btn-num')) {
                    this.btnForDisplay(el.innerText)
                } else if (el.classList.contains('btn-clear')) {
                    this.clearDisplay();
                } else if (el.classList.contains('btn-del')) {
                    this.backSpace();
                } else if (el.classList.contains('btn-eq')) {
                    this.runCalc();
                }
            })
        },

        pressKey() {
            document.addEventListener('keydown', e => {
                if (this.isNumberKey(e)) {
                    this.btnForDisplay(e.key)
                } else if (this.isOperatorKey(e)) {
                    this.btnForDisplay(e.key)
                } else if (e.key === 'Enter') {
                    this.runCalc()
                } else if (e.key === 'Backspace') {
                    this.backSpace()
                } else if (e.key === 'Escape') {
                    this.clearDisplay()
                }
            })
        },

        isNumberKey(e) {
            return /\d/.test(e.key)
        },

        isOperatorKey(e) {
            return ['+', '-', '*', '/'].includes(e.key);
        },

        btnForDisplay(valor) {
            this.display.value += valor
        },

        safeEval(expression) {
            const allowedChars = '0123456789+-*/(). ';
            for (let char of expression) {
                if (!allowedChars.includes(char)) {
                    throw new Error('Invalid character in expression');
                }
            }
            return Function('"use strict"; return (' + expression + ')')();
        }
    }
}

const calculator = createCalculator();
calculator.init()