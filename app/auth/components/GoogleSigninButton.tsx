import { Button, CircularProgress } from "@mui/material";
import { GoogleIcon } from "./customIcons";
import { signIn } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { indigo } from "@mui/material/colors";

type FormResponse = {
  message: string;
  success: boolean;
};

type GoogleSigninButtonProps = {
  setFormResponse: Dispatch<SetStateAction<FormResponse | null | undefined>>;
};

const GoogleSigninButton: React.FC<GoogleSigninButtonProps> = ({
  setFormResponse,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });

      setFormResponse({
        message: "Signin successful",
        success: true,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error signing in with Google";
      setFormResponse({
        message,
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        disabled={loading}
        startIcon={
          loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <GoogleIcon />
          )
        }
        onClick={handleGoogleSignIn}
        size="large"
        sx={{
          py: 1.5,
          px: 4,
          border: 2,
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
          backgroundColor: "#f8faff",
          color: "inherit",
          borderColor: "divider",
          "&:hover": {
            borderColor: indigo[600],
          },
          "&:disabled": {
            backgroundColor: "action.disabled",
          },
        }}
      >
        Continue with Google
      </Button>
    </>
  );
};

export default GoogleSigninButton;
