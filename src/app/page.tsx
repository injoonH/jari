import { signOut } from '@/actions/auth'
import { SubmitButton } from '@/ui/atoms'

const Home: React.FC = () => {
  return (
    <main>
      <p>
        Jari, KAIST Unified Reservation Service (URS) with extra convenience
        features
      </p>
      <form action={signOut}>
        <SubmitButton text="로그아웃" primary />
      </form>
    </main>
  )
}

export default Home
