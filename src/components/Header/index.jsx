import { RiShutDownLine } from 'react-icons/ri';
import{ Container, Profile, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

export function Header() {

  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }


  return (
    <Container>
      <Profile to ="/profile">
        <img 
          src='https://github.com/math-cristhyan.png'
          alt='Foto do Usuário'
        />

        <div>
          <span>Bem-vindo</span>
          <strong>Matheus Cristhyan</strong>
        </div>
      </Profile>
      
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
      
    </Container>
  )
}