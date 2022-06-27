new Vue({
    el: '#app',
    data: {
        contatos: [{
            'nome': 'Beatriz Turba',
            'telefone': '123456789'
        }],
        form: {
            nome: '',
            telefone: '',
            index: null
        },
        btn_add: true,
        btn_atualizar: false
    },
    filters: {
        nomeEmMaiuscula: function(value) {
            if (!value) return ''
            value = value.toString();
            return value.toLowerCase();
        }
    },
    methods: {
        add: function(event) {
            if (this.form.nome && this.form.telefone) {
                const nomeValido = this.validarNome(this.form.nome);
                if (nomeValido) {
                    this.contatos.push({
                    'nome': this.form.nome,
                    'telefone': this.form.telefone
                    });
                    this.limparCampos();
                }
            } else if (!this.form.nome && this.form.telefone) {
                alert('Adicione o Nome!');
            } else if (this.form.nome && !this.form.telefone) {
                alert('Adicione o Telefone!');
            } else {
                alert('Adicione todos os dados!');
            }
            event.preventDefault();
        },
        editar: function(index) {
            this.form.index = index;
            this.form.nome = this.contatos[index].nome;
            this.form.telefone = this.contatos[index].telefone;

            this.btn_atualizar = true;
            this.btn_add = false;
        },
        atualizar: function(event) {
            if (this.form.nome && this.form.telefone) {
                if (this.form.index != null && typeof this.form.index == 'number') {
                    this.contatos[this.form.index].nome = this.form.nome;
                    this.contatos[this.form.index].telefone = this.form.telefone;

                    this.btn_atualizar = false;
                    this.btn_add = true;
                    this.limparCampos();
                }
            } else {
                alert('Preencha todos os dados!');
            }
            event.preventDefault();
        },
        apagar: function(index) {
            this.contatos.splice(index, 1);
        },
        limparCampos: function() {
            this.form.nome = '';
            this.form.telefone = '';
            this.form.index = null;
        },
        validarNome: function(nome) {
            let validacao = true;
            if (nome.split(' ').length < 2) {
                alert('Por favor, informe NOME e SOBRENOME');
                validacao = false;
            }
            const nomeCompletoArr = nome.split(' ');
            console.log(nomeCompletoArr);
            for (let i = 0; i < nomeCompletoArr.length; i++) {
                if (nomeCompletoArr[i].length < 3) {
                    alert('O nome deve ter mais que 2 letras.')
                    validacao = false;
                    break;
                }
            }
            return validacao;
        },
    }
    // mask 
})

const masked = document.querySelectorAll('.masked');
const prefixed = document.querySelectorAll('.prefixed');

const maskInput = (evt) => {
const input = evt.target;

const pattern = input.dataset.pattern;
const prefix = input.dataset.prefix;
let reg;
let value;
let startIndex = 0;
let count = 0;
let formatedValue = "";

if (prefix) {
startIndex = prefix.length;
formatedValue += prefix;
if (input.value.length < prefix.length) {
    input.value = prefix;
}
}
if (prefix && prefix === input.value.slice(0, prefix.length)) {
value = input.value.replace(prefix, "").replace(/[^\d]/g, "");
} else {
value = input.value.replace(/[^\d]/g, "");
}

for (let i = startIndex; i < pattern.length; i++) {
if (value[count]) {
    if (pattern[i] != "*") {
        formatedValue += pattern[i];
    } else {
        formatedValue += value[count];
        count++;
    }
}
}

input.value = formatedValue;
};

const onMaskedInputBlur = (evt) => {
const input = evt.target;
const prefix = input.dataset.prefix;
if (prefix && input.value.length <= prefix.length) {
input.value = "";
}
};

const onMaskedInputFocus = (evt) => {
const input = evt.target;
const prefix = input.dataset.prefix;
if (prefix && !input.value) {
input.value = prefix;
}
};

function setMaskedInputListener(elem) {
elem.addEventListener("input", maskInput);
}
function setPrefixedInputListener(elem) {
elem.addEventListener("blur", onMaskedInputBlur);
elem.addEventListener("focus", onMaskedInputFocus);
}

masked.forEach((el) => setMaskedInputListener(el));
prefixed.forEach((el) => setPrefixedInputListener(el));
</script>
<script href="https://drive.google.com/file/d/1I88nS6LC3-wjnmjJWIkuDbdYtlmXG4bf/view?usp=sharing"></script>