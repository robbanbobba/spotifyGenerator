import { useNavigate } from 'react-router'

export default function useNavigation() {
    const navigate = useNavigate();

    const navigateTo = (endpoint: string) => {
        navigate(`${endpoint}`)
    }

    return { navigateTo }
}