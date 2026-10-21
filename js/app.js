
  // Validação do cadastro usando o DOM + estados visuais do Bootstrap 5.3.
const signup = document.querySelector('#dados');
if (signup) {
    signup.setAttribute('novalidate', '');

    const fields = {
    nome: signup.querySelector('#nome'),
    sobrenome: signup.querySelector('#sobrenome'),
    usuario: signup.querySelector('#usuario'),
    senha: signup.querySelector('#senha'),
    email: signup.querySelector('#email'),
    nascimento: signup.querySelector('#datanascimento')
    };

    // Aplica os componentes e atributos de formulário do Bootstrap sem remover os estilos do site.
    Object.values(fields).forEach((field) => {
    if (!field) return;
    field.classList.add('form-control');
    field.setAttribute('aria-describedby', `${field.id}-feedback`);

    let feedback = document.getElementById(`${field.id}-feedback`);
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = `${field.id}-feedback`;
        feedback.className = 'invalid-feedback';
        feedback.setAttribute('aria-live', 'polite');
        field.insertAdjacentElement('afterend', feedback);
    }
    });

    if (fields.usuario) fields.usuario.minLength = 4;
    if (fields.senha) fields.senha.minLength = 8;
    if (fields.email) fields.email.setAttribute('autocomplete', 'email');
    if (fields.senha) fields.senha.setAttribute('autocomplete', 'new-password');

    const validateField = (field) => {
    if (!field) return true;
    field.setCustomValidity('');
    const value = field.value.trim();

    if (field === fields.nome || field === fields.sobrenome) {
        if (!value) field.setCustomValidity('Preencha este campo.');
    } else if (field === fields.usuario) {
        if (value.length < 4) field.setCustomValidity('O usuário deve ter pelo menos 4 caracteres.');
    } else if (field === fields.senha) {
        if (field.value.length < 8) field.setCustomValidity('A senha deve ter pelo menos 8 caracteres.');
    } else if (field === fields.nascimento && value) {
        const date = new Date(`${value}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (Number.isNaN(date.getTime())) {
        field.setCustomValidity('Informe uma data válida.');
        } else if (date > today) {
        field.setCustomValidity('A data de nascimento não pode ser futura.');
        }
    }

    const valid = field.checkValidity();
    field.classList.toggle('is-valid', valid && field.value.trim() !== '');
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));

    const feedback = document.getElementById(`${field.id}-feedback`);
    if (feedback) {
        feedback.textContent = valid ? '' : (field.validationMessage || 'Verifique este campo.');
    }
    return valid;
    };

    Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => validateField(field));
    field.addEventListener('change', () => validateField(field));
    field.addEventListener('blur', () => {
        if (field.value !== '' || signup.classList.contains('was-validated')) validateField(field);
    });
    });


    signup.addEventListener('submit', (event) => {
    event.preventDefault();
    signup.classList.add('was-validated');

    const results = Object.values(fields).filter(Boolean).map(validateField);
    const firstInvalid = Object.values(fields).find((field) => field && !field.checkValidity());
    if (results.some((valid) => !valid) || !signup.checkValidity()) {
        if (firstInvalid) firstInvalid.focus();
        return;
    }

      // Fluxo demonstrativo: sem backend, nenhuma conta é criada e os dados não são enviados.
    const modalElement = document.getElementById('modalCadastro');

    if (modalElement && window.bootstrap) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        document.getElementById('continuarFeedback').onclick = () => {
        window.location.href = 'feedback.html';
        };
    } else {
        console.error('Modal ou Bootstrap não encontrado.');
    }
    });
}

      // Fluxo demonstrativo: sem backend, nenhuma conta é criada e os dados não são enviados.



