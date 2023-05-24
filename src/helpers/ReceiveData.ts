import axios from "axios";
import { GetServerSideProps } from "next";
export const getUserDetails: GetServerSideProps = async (context) => {
  // Récupérer le token JWT depuis les cookies
  const token = context.req.cookies.jetonJWT; // Modifier "jetonJWT" selon le nom que vous avez utilisé lors de l'enregistrement du token dans les cookies

  try {
    // Faire une requête à l'API pour récupérer les détails de l'utilisateur
    const response = await axios.get("http://localhost:8080/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Récupérer les données de l'utilisateur depuis la réponse de l'API
    const user = response.data;

    // Retourner les données de l'utilisateur en tant que props
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    // Gérer les erreurs de requête API ici
    // Par exemple, si le token JWT est invalide ou expiré
    // Vous pouvez rediriger l'utilisateur vers la page de connexion ou afficher un message d'erreur
    console.error(error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
