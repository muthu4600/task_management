import LoginForm from "@/components/LoginForm";

const page = () => {

    return (
        <div className="max-w-md mx-auto m-40 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-black mb-6">Login</h2>
            <LoginForm />
        </div>
    );
};

export default page;
