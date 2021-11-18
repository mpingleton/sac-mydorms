import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import { RegisterForm } from '../components/RegisterForm';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Register for an account">
      <RegisterForm
        onSuccess={() => navigate('/auth/login')}
        onCancel={() => navigate('/')}
      />
    </Layout>
  );
};

export default Register;
