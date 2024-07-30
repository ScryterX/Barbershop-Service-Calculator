"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/app/_components/ui/button"; // Certifique-se de que este botão usa Tailwind
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/app/_components/ui/card"; // Certifique-se de que este cartão usa Tailwind
import { FaGoogle } from "react-icons/fa";
const LoginCard = () => {
  return (
    <Card className="w-full max-w-sm space-y-4 rounded-lg bg-white p-8 shadow-lg">
      <CardHeader>
        <h1 className="text-2xl font-bold">Bem-vindo à Mustache Barbearia</h1>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => signIn("google")}
          className="w-full gap-2 bg-red-500 text-white hover:bg-red-600"
        >
          <FaGoogle />
          Entrar com Google
        </Button>
      </CardContent>
      <CardFooter>
        {/* Adicione qualquer conteúdo de rodapé aqui, se necessário */}
      </CardFooter>
    </Card>
  );
};

export default LoginCard;
