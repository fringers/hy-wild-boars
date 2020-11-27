import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Link from "next/link";
import {signOut} from "../firebase/auth";

export const Layout = ({user, children}) => {
  const Authorized = ({user}) => <><Link href="/"><a>Home</a></Link> | {user.email} | <a href="#" onClick={signOut}>Logout</a></>
  const Unauthorized = () => <Link href="/login">Logowanie</Link>

  return (
    <>
      <Container>
        <Row>
          {
            user
              ? <Authorized user={user}/>
              : <Unauthorized/>
          }
        </Row>
      </Container>

      {children}
    </>
  )
}
