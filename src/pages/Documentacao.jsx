import React from 'react';

export default function Documentacao() {
  return (
    <main className="container">
      <section className="conteudo">
        <div className="box">
          <h2>🔐 Introdução à Criptografia</h2>
          <p>A criptografia é a técnica de proteger informações por meio da transformação de dados legíveis em um formato codificado, que só pode ser compreendido por quem tiver a chave correta. Ela é essencial para manter a privacidade, segurança, e a integridade das informações em ambientes digitais.</p>
        </div>

        <div className="box">
          <h2>🧩 Por que usar Criptografia?</h2>
          <p>Vivemos na era da informação. Dados pessoais, financeiros e corporativos circulam constantemente pela internet. A criptografia serve como uma camada de proteção contra vazamentos de dados, acessos não autorizados e alterações maliciosas.</p>
        </div>

        <div className="box">
          <h2>🔐 Tipos de Criptografia</h2>
          <h3>1. Criptografia Simétrica (Ex: AES)</h3>
          <p>Neste modelo, uma única chave é usada tanto para cifrar quanto para decifrar a informação. É rápida e ideal para grandes volumes de dados.</p>

          <h3>2. Funções Hash (Ex: SHA-256, MD5)</h3>
          <p>Transformam qualquer dado em um código fixo e irreversível. Não é possível "descriptografar" um hash. Ideal para verificação de integridade e proteção de senhas.</p>

          <h3>3. Codificações (Ex: Base64, Hexadecimal)</h3>
          <p>Embora não sejam criptografia no sentido técnico (pois podem ser revertidas facilmente), codificações são muito usadas para representar dados em formatos compatíveis com transmissão ou leitura.</p>
        </div>

        <div className="box">
          <h2>👥 Acesso às Ferramentas</h2>
          <p>O CryptoSeg agora é uma plataforma totalmente <strong>Serverless</strong> e <strong>Client-Side</strong>. Isso significa que todas as ferramentas estão disponíveis gratuitamente para todos os usuários, sem necessidade de login. Nenhuma informação digitada é enviada para servidores externos.</p>
        </div>
      </section>
    </main>
  );
}