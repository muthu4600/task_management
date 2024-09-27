import SignupForm from '@/components/SignupForm';

const page = () => {

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-black text-center mb-6">Sign Up</h2>
            <SignupForm />
        </div>
    );
};

export default page;
