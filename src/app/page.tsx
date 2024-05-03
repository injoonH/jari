import { signOut } from '@/actions/auth'

const Home: React.FC = () => {
  return (
    <main>
      <p>
        Jari, KAIST Unified Reservation Service (URS) with extra convenience
        features
      </p>
      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </main>
  )
}

export default Home
