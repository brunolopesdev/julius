import { useState } from "react";
import { TableLast } from "../../components/Table/Table";
import { useAuth } from "../../context/AuthContext";
import "./Index.scss";

export const Main = () => {
  const { currentUser, monthly } = useAuth();
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <div className="main__greeting">
            <h1>Olá, {currentUser?.displayName}!</h1>
            <p>Bem-vindo a sua dashboard.</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i className="fa fa-file-alt fa-2x text-lightblue"></i>
            <div className="card-inner">
              <p className="text-primary-p">Quantidade de compras</p>
              <span className="font=bold text-title"></span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-archive fa-2x text-red"></i>
            <div className="card-inner">
              <p className="text-primary-p">Valor total</p>
              <span className="font-bold text-title">R$</span>
            </div>
          </div>
        </div>

        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Ultimos Gastos</h1>
              </div>
              <i className="fa fa-money-bill-alt"></i>
            </div>
            <div style={{ marginTop: "35px" }}>
              <TableLast />
            </div>
          </div>

          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Cotas do Mês</h1>
                <p>São Paulo, SP</p>
              </div>
              <i className="fa fa-money-bill-alt"></i>
            </div>

            <div className="charts__right__cards">
              <div className="card1">
                <h1>Valor disponível</h1>
                <p>R$ {monthly}</p>
              </div>
              <div className="card2">
                <h1>VR</h1>
                <p>...</p>
                <p>R$</p>
              </div>

              <div className="card3">
                <h1>Contas Fixas</h1>
                <p>...</p>
                <p>R$ </p>
              </div>

              <div className="card4">
                <img
                  src="https://c.tenor.com/T-QwrdDkb0YAAAAM/ok-cool.gif"
                  alt="Julius Ok"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
