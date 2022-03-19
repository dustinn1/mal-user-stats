import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  HeaderGroup,
  Row,
  Cell,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import intervalToDuration from "date-fns/intervalToDuration";
import formatDuration from "date-fns/formatDuration";

type Props = {
  data: any[];
  dataIndex: string;
  sortBy?: string;
};

function TableLayout({ columns, data, dataIndex }: any) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    pageCount,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: dataIndex,
            desc: false,
          },
        ],
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="bg-white border border-gray-300">
        <table
          className="table-fixed w-full border-collapse"
          {...getTableProps()}
        >
          <thead className="border-b border-gray-300 bg-gray-100/80">
            {headerGroups.map((headerGroup: HeaderGroup<object>) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr
                  key={key}
                  className="divide-x divide-gray-200"
                  {...restHeaderGroupProps}
                >
                  {headerGroup.headers.map((column: HeaderGroup<object>) => {
                    const { key, ...restColumnProps } = column.getHeaderProps(
                      column.getSortByToggleProps()
                    );
                    return (
                      <th key={key} className="py-2" {...restColumnProps}>
                        <div className="flex justify-between px-5 select-none">
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FontAwesomeIcon icon={faSortDown} />
                              ) : (
                                <FontAwesomeIcon icon={faSortUp} />
                              )
                            ) : (
                              <FontAwesomeIcon icon={faSort} />
                            )}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="" {...getTableBodyProps()}>
            {page.map((row: Row<object>) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  className="even:bg-gray-100/75 divide-x divide-gray-200"
                  {...restRowProps}
                >
                  {row.cells.map((cell: Cell<object, any>) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td
                        key={key}
                        className="py-2 first:font-semibold"
                        {...restCellProps}
                      >
                        <div className="px-5">
                          {cell.column.id === "time_watched"
                            ? formatDuration(
                                intervalToDuration({
                                  start: 0,
                                  end: cell.value * 1000,
                                })
                              )
                            : cell.value}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div className="flex justify-end py-3 border-collapse">
          {[...Array(pageCount)].map((_, index) => {
            return (
              <button
                key={index}
                className={`border-l border-y border-gray-700 py-1 px-3.5 first:rounded-l-md last:border last:rounded-r-md ${
                  pageIndex === index
                    ? "bg-gray-700 text-white"
                    : "text-gray-700 hover:bg-gray-700 hover:text-white transition-colors"
                }`}
                onClick={() => gotoPage(index)}
              >
                {(index + 1).toString()}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default function Table({ data, dataIndex }: Props) {
  const tableData = useMemo(() => data, [data]);

  const tableColumns = useMemo(
    () => [
      {
        Header: dataIndex.charAt(0).toUpperCase() + dataIndex.slice(1),
        accessor: dataIndex,
      },
      {
        Header: "Count",
        accessor: "count",
      },
      {
        Header: "Time Watched",
        accessor: "time_watched",
      },
      {
        Header: "Mean Score",
        accessor: "mean_score",
      },
    ],
    [dataIndex]
  );

  return (
    <TableLayout
      columns={tableColumns}
      data={tableData}
      dataIndex={dataIndex}
    />
  );
}
