// Component
import { ConfirmModal } from "../../components/Modals/ConfirmModal/ConfirmModal";
// React imports
import { useEffect, useState } from "react";
// Service
import { validateService } from "../../services/authServices/ValidateService";

export const Validation = () => {
  // Const
  const message = "Cuenta verificada con éxito.";

  // Href
  const regCode = document.location.href.substring(31);
  const [error, setError] = useState("");

  // Function
  useEffect(() => {
    const validationService = async () => {
      try {
        await validateService(regCode);

        setTimeout(() => {
          window.close();
        }, 2000);
      } catch (error) {
        setError(error.message);

        setTimeout(() => {
          window.close();
        }, 5000);
      }
    };
    validationService();
  }, [regCode]);

  // Errors
  if (error === `Incorrect validation. User deleted`)
    setError(
      "Verificación incorrecta. Quizás el usuario fue borrado. Por favor, ponte en contacto con nosotros en chooseamoviesl@gmail.com."
    );

  if (error === `There is no user registered with this code`)
    setError("Código de verificación caducado.");

  return (
    <section>
      <ConfirmModal error={error} message={!error && message} />
    </section>
  );
};
