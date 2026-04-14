import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const CreateAdminPage = () => {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAdmin = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/create-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data);
            } else {
                setError(data.error || 'Failed to create admin');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header bg-primary text-white'>
                            <h3>Create Admin User</h3>
                        </div>
                        <div className='card-body'>
                            <p className='text-muted mb-4'>
                                Click the button below to create an admin user with default credentials.
                            </p>
                            
                            <button 
                                className='btn btn-primary btn-lg w-100' 
                                onClick={createAdmin}
                                disabled={loading}
                            >
                                {loading ? 'Creating Admin...' : 'Create Admin'}
                            </button>

                            {result && (
                                <div className='alert alert-success mt-4'>
                                    <h4 className='alert-heading'>Success!</h4>
                                    <p>{result.message}</p>
                                    <hr />
                                    <p className='mb-0'><strong>Email:</strong> {result.email}</p>
                                    <p className='mb-0'><strong>Password:</strong> {result.password}</p>
                                </div>
                            )}

                            {error && (
                                <div className='alert alert-danger mt-4'>
                                    <h4 className='alert-heading'>Error!</h4>
                                    <p className='mb-0'>{error}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
