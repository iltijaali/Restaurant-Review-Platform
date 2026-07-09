import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-md items-center px-3 py-10 sm:py-14">
      <div className="w-full">
        <RegisterForm />
      </div>
    </section>
  );
}

export default RegisterPage;
