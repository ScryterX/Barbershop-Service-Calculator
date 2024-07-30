"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import ServicesCategory from "./services";
import { ProductsList } from "./data/ProductList";
import { PubProductsList } from "./data/PubProductList";

export function CategoryList() {
  //<Accordion type="single" collapsible className="w-full">
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Serviços</AccordionTrigger>
        <AccordionContent>
          <ServicesCategory />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Produtos</AccordionTrigger>
        <AccordionContent>
          <ProductsList />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Bar e cozinha</AccordionTrigger>
        <AccordionContent>
          <PubProductsList />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
