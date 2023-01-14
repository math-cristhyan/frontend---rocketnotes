import { Container } from "./style";

export function Button({title, loading = false, onClick, onKeyDown, ...rest}) {

  return (
  <Container type="button"
  disabled={loading}
  onClick = {onClick}
  >
    {loading ? 'Carregando...' : title}
  </Container>
  )
}