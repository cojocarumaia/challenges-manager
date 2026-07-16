import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
    function handleRegister(data) {
        console.log(data);
    }

    return (
        <RegisterForm
            onSubmit={handleRegister}
        />
    );
}

export default RegisterPage;