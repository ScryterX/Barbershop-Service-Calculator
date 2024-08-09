"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

interface CustomTableMeta {
  quantities: Record<string, number>;
  // eslint-disable-next-line no-unused-vars
  updateQuantity: (rowId: string, quantity: number) => void;
}

const data: Service[] = [
  {
    id: "1",
    name: "Lavagem finalização",
    price: 20,
    clubDiscountPercentage: 100,
  },
  {
    id: "2",
    name: "Corte degradê | Infantil | Executivo | Tradicional",
    price: 35,
    clubDiscountPercentage: 100,
  },
  {
    id: "3",
    name: "Corte Shaver | Navalhado | Clássico",
    price: 40,
    clubDiscountPercentage: 100,
  },
  {
    id: "4",
    name: "Corte Máquina | Militar",
    price: 30,
    clubDiscountPercentage: 100,
  },
  {
    id: "5",
    name: "Barba simples",
    price: 30,
    clubDiscountPercentage: 100,
  },
  {
    id: "6",
    name: "Barbaterapia",
    price: 40,
    clubDiscountPercentage: 10,
  },
  {
    id: "7",
    name: "Platinado",
    price: 150,
    clubDiscountPercentage: 0,
  },
  {
    id: "8",
    name: "Camuflagem",
    price: 20,
    clubDiscountPercentage: 10,
  },
  {
    id: "9",
    name: "Selagem",
    price: 50,
    clubDiscountPercentage: 10,
  },
  {
    id: "10",
    name: "Mechas",
    price: 120,
    clubDiscountPercentage: 0,
  },
  {
    id: "11",
    name: "Terapia facial",
    price: 60,
    clubDiscountPercentage: 10,
  },
  {
    id: "12",
    name: "Limpeza de pele",
    price: 80,
    clubDiscountPercentage: 10,
  },
  {
    id: "13",
    name: "Cone Hindu",
    price: 40,
    clubDiscountPercentage: 10,
  },
  {
    id: "14",
    name: "Cone Hindu",
    price: 40,
    clubDiscountPercentage: 10,
  },
  {
    id: "15",
    name: "Pézinho Cabelo e Barba",
    price: 10,
    clubDiscountPercentage: 100,
  },
  {
    id: "16",
    name: "Freestyle",
    price: 10,
    clubDiscountPercentage: 10,
  },
  {
    id: "17",
    name: "(EXTRA) Sombrancelha na Navalha",
    price: 10,
    clubDiscountPercentage: 10,
  },
  {
    id: "18",
    name: "(EXTRA) Hidratação Cabelo e Barba ",
    price: 20,
    clubDiscountPercentage: 10,
  },
  {
    id: "19",
    name: "(EXTRA) Extração cera do nariz e ouvido",
    price: 10,
    clubDiscountPercentage: 10,
  },
  {
    id: "20",
    name: "(EXTRA) Esfoliação facial ",
    price: 10,
    clubDiscountPercentage: 10,
  },
  {
    id: "21",
    name: "(EXTRA) Extração de cravos mask negra ",
    price: 10,
    clubDiscountPercentage: 10,
  },
];

export type Service = {
  id: string;
  name: string;
  price: number;
  clubDiscountPercentage: number;
};

export const columns: ColumnDef<Service>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produto
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Preço Unitário (R$)</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantidade</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as CustomTableMeta;
      const quantity = meta.quantities[row.id] || 1;

      const handleIncrement = () => {
        const newQuantity = (quantity || 1) + 1;
        meta.updateQuantity(row.id, newQuantity);
      };

      const handleDecrement = () => {
        if (quantity > 1) {
          const newQuantity = (quantity || 1) - 1;
          meta.updateQuantity(row.id, newQuantity);
        }
      };

      return (
        <div className="flex items-center justify-end space-x-2">
          <Button variant="outline" size="icon" onClick={handleDecrement}>
            -
          </Button>
          <span>{quantity}</span>
          <Button variant="outline" size="icon" onClick={handleIncrement}>
            +
          </Button>
        </div>
      );
    },
  },
  {
    id: "total",
    header: () => <div className="text-right">Total (R$)</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as CustomTableMeta;
      const price = parseFloat(row.getValue("price"));
      const quantity = meta.quantities[row.id] || 1;
      const total = price * quantity;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(total);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "clubDiscountPercentage",
    header: () => <div className="text-right">Desconto Clubista (%)</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue("clubDiscountPercentage")}%
      </div>
    ),
  },
  {
    id: "clubDiscountValue",
    header: () => <div className="text-right">Desconto Clubista (R$)</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as CustomTableMeta;
      const price = parseFloat(row.getValue("price"));
      const discountPercentage = parseFloat(
        row.getValue("clubDiscountPercentage"),
      );
      const quantity = meta.quantities[row.id] || 1;
      const discountValue = price * (discountPercentage / 100) * quantity;
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(discountValue);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copiar ID do produto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes do produto</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ServicesList() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    {},
  );

  const updateQuantity = (rowId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [rowId]: quantity }));
  };

  const table = useReactTable({
    data,
    columns,
    meta: {
      quantities,
      updateQuantity,
    } as CustomTableMeta,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const totalNonClub = table
    .getFilteredSelectedRowModel()
    .rows.reduce(
      (total, row) => total + row.original.price * (quantities[row.id] || 1),
      0,
    );

  const totalClub = table
    .getFilteredSelectedRowModel()
    .rows.reduce((total, row) => {
      const discount =
        row.original.price *
        (row.original.clubDiscountPercentage / 100) *
        (quantities[row.id] || 1);
      return total + row.original.price * (quantities[row.id] || 1) - discount;
    }, 0);

  const sortedRows = React.useMemo(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.sort((a, b) => a.original.name.localeCompare(b.original.name));
    const unselectedRows = table
      .getRowModel()
      .rows.filter((row) => !selectedRows.includes(row))
      .sort((a, b) => a.original.name.localeCompare(b.original.name));

    return [...selectedRows, ...unselectedRows];
  }, [table.getRowModel().rows, table.getSelectedRowModel().rows]);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar produtos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="max-h-[500px] overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {sortedRows.length ? (
              sortedRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total não clubista:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalNonClub)}
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          Total clubista:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(totalClub)}
        </div>
      </div>
    </div>
  );
}
