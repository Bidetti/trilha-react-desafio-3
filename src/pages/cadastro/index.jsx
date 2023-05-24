import { useNavigate } from 'react-router-dom';
import { MdEmail, MdPerson, MdLock } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from 'react-hook-form';

import { AccountText, AccountTextHighlight, AgreementText, Column, Container, SubtitleCadastro, Title, TitleCadastro, Wrapper } from './styles';
import { Row } from '../login/styles';

const Cadastro = () => {

    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await api.post('/users', formData);

            if (data.id) {
                navigate('/login');
                return;
            }

            alert('Erro ao cadastrar usuário');
        } catch (e) {
            console.log(e);
        }
    };

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologia e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleCadastro>Comece agora grátis</TitleCadastro>
                    <SubtitleCadastro>Crie sua conta e make the change._</SubtitleCadastro>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input placeholder="Nome completo" leftIcon={<MdPerson />} name="nome" control={control} />
                        {errors.nome && <span>Nome é obrigatório</span>}
                        <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                        {errors.email && <span>E-mail é obrigatório</span>}
                        <Input type="password" placeholder="Password" leftIcon={<MdLock />} name="senha" control={control} />
                        {errors.senha && <span>Senha é obrigatório</span>}
                        <Button title="Criar minha conta" variant="secondary" type="submit" />
                    </form>
                    <Column>
                        <AgreementText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</AgreementText>
                        <Row>
                        <AccountText>Já tenho conta. <AccountTextHighlight type='button' onClick={navigateToLogin}>Fazer login</AccountTextHighlight></AccountText>
                        </Row>
                    </Column>
                </Wrapper>
            </Column>
        </Container>
        </>
    )
}

export { Cadastro }