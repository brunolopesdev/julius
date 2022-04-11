import { useState, useRef } from "react";
import { Button } from "../../components/Button/Index";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import { FaSignInAlt } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Index.scss";

const override = css`
  display: block;
  margin: 2.5rem auto;
`;

export const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, login, currentUser, googleSignIn } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      setMessage("Cadastrado com sucesso");
    } catch (error) {
      setLoading(false);
      setMessage("Ocorreu um erro ao se cadastrar");
    }
    setLoading(false);
  }

  async function handleGoogleLogin(e) {
    e.preventDefault();

    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <section className="signup__container">
      <h1 className="title">
        Faça seu <span>Cadastro</span>!
      </h1>

      <div className="signup__wrapper">
        {message && message}

        {loading ? (
          <ClipLoader css={override} size={75} />
        ) : (
          <>
            <form>
              {/* <div className="input__wrapper">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o seu nome"
              name="name"
              required
              ref={nameRef}
            />
          </div> */}

              <div className="input__wrapper">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
                  required
                  ref={emailRef}
                />
              </div>

              <div className="input__wrapper">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite a sua senha"
                  name="password"
                  required
                  ref={passwordRef}
                />
              </div>
              <Button
                text="Cadastrar"
                type="submit"
                data={handleSignup}
                disabled={loading || currentUser}
                icon={<FaSignInAlt />}
              />
              <Button
                text="Entrar com e-mail"
                type="submit"
                data={handleLogin}
                disabled={loading || currentUser}
                icon={<HiOutlineMail />}
              />
              <Button
                text="Entrar com Google"
                type="submit"
                data={handleGoogleLogin}
                disabled={loading || currentUser}
                icon={<FcGoogle />}
              />
            </form>
          </>
        )}
      </div>
    </section>
  );
};
