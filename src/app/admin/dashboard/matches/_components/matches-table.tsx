"use client";
import { FiExternalLink } from "react-icons/fi";
import {
  ChangeEvent,
  Key,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { EditMatchesModal } from "./edit-matches-modal";
import { IMatchesFromDb } from "@/types/IMatchesFromDb";

interface IMatchesTableProps {
  matches: IMatchesFromDb[];
}

const columns = [
  {
    name: "Time da Casa",
    headerName: "TIME DA CASA",
    uid: "teamHome",
    sortable: true,
  },
  {
    name: "Time Visitante",
    headerName: "TIME VISITANTE",
    uid: "teamAway",
    sortable: true,
  },
  { name: "Rodada", headerName: "RODADA", uid: "round", sortable: true },
  { name: "HBO Max", headerName: "HBO MAX", uid: "hboMax", sortable: true },
  { name: "Globo", headerName: "GLOBO", uid: "globo", sortable: true },
  { name: "Premiere", headerName: "PREMIERE", uid: "premiere", sortable: true },
  { name: "SporTV", headerName: "SPORTV", uid: "sportv", sortable: true },
  {
    name: "Paulistão",
    headerName: "PAULISTÃO",
    uid: "paulistao ",
    sortable: true,
  },
  {
    name: "Canal TNT",
    headerName: "CANAL TNT",
    uid: "canalTnt",
    sortable: true,
  },
  {
    name: "Play Plus",
    headerName: "PLAY PLUS",
    uid: "playPlus",
    sortable: true,
  },
  {
    name: "Canal Record",
    headerName: "CANAL RECORD",
    uid: "canalRecord",
    sortable: true,
  },
  { name: "CazeTV", headerName: "CAZÉ TV", uid: "cazeTv", sortable: true },
  {
    name: "Paulistão Play",
    headerName: "PAULISTÃO PLAY",
    uid: "paulistaoPlay",
    sortable: true,
  },
  {
    name: "Camisa 21",
    headerName: "CAMISA 21",
    uid: "camisa21",
    sortable: true,
  },
  {
    name: "Futebol Paulista",
    headerName: "FUTEBOL PAULISTA",
    uid: "futebolPaulista",
    sortable: true,
  },
  {
    name: "Canal Futura",
    headerName: "CANAL FUTURA",
    uid: "canalFutura",
    sortable: true,
  },
  { name: "Ações", headerName: "AÇÕES", uid: "actions", sortable: false },
];

const INITIAL_VISIBLE_COLUMNS = ["teamHome", "teamAway", "round", "actions"];

export function MatchesTable({ matches }: IMatchesTableProps) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rodadaFilter, setRodadaFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({});

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredMatches = [...matches];

    if (hasSearchFilter) {
      filteredMatches = filteredMatches.filter((match) => {
        return match.teamHome.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    return filteredMatches;
  }, [matches, hasSearchFilter, filterValue]);

  type Matches = (typeof matches)[0];

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Matches, b: Matches) => {
      const first = a[
        sortDescriptor.column as keyof Matches
      ] as unknown as number;
      const second = b[
        sortDescriptor.column as keyof Matches
      ] as unknown as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((match: Matches, columnKey: Key) => {
    const cellValue = match[columnKey as keyof Matches];

    switch (columnKey) {
      case "teamHome":
        return (
          <p className="text-default-900 font-semibold">{match.teamHome}</p>
        );
      case "teamAway":
        return (
          <p className="text-default-900 font-semibold">{match.teamAway}</p>
        );
      case "hboMax" ||
        "globo" ||
        "premiere" ||
        "sportv" ||
        "paulistao" ||
        "canalTnt" ||
        "playPlus" ||
        "canalRecord" ||
        "cazeTv" ||
        "paulistaoPlay" ||
        "camisa21" ||
        "futebolPaulista" ||
        "canalFutura":
        return (
          <>
            {cellValue && (
              <Button
                as={Link}
                href={cellValue.toString()}
                target="_blank"
                variant="flat"
                isIconOnly
              >
                <FiExternalLink />
              </Button>
            )}
          </>
        );
      case "round":
        return <p className="text-default-900 font-semibold">{match.round}</p>;
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <EditMatchesModal match={match} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<IoIosSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            radius="lg"
            size="sm"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaAngleDown />} variant="flat">
                  Rodada
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Rodada"
                closeOnSelect={false}
                selectedKeys={rodadaFilter}
                selectionMode="multiple"
                onSelectionChange={setRodadaFilter}
              >
                {Array.from(new Set(matches.map((match) => match.round))).map(
                  (round) => (
                    <DropdownItem key={round} className="capitalize">
                      {round}
                    </DropdownItem>
                  )
                )}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaAngleDown className="text-small" />}
                  variant="flat"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Colunas"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid}>
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total de {matches.length} partidas
          </span>
          <label className="flex items-center text-default-400 text-small">
            Partidas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small cursor-pointer"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    rodadaFilter,
    matches,
    visibleColumns,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todas partidas selecionadas"
            : `${selectedKeys.size} de ${filteredItems.length} selecionada${
                selectedKeys.size > 1 ? "s" : ""
              }`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Seguinte
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <Table
      aria-label="Tabela de partidas"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.headerName}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"Nenhuma partida encontrada"}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey) as ReactElement}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
