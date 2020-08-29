import React from "react"
import PropTypes from "prop-types"
import {
  Table,
  AutoSizer,
  InfiniteLoader,
  CellMeasurerCache,
  defaultTableRowRenderer as DefaultRowRenderer,
} from "react-virtualized"
import { Spin } from "antd"
import "react-virtualized/styles.css"

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 80, // keep this <= any actual row height
})

const MIN_TABLE_WIDTH = 1000

const rowRenderer = (props, size) => {
  if (props.index === size) {
    return (
      <div {...props}>
        <Spin />
      </div>
    )
  }
  return <DefaultRowRenderer {...props} />
}

const InfiniteScrollTable = ({ data, fetchMore, hasNext, children }) => (
  <InfiniteLoader
    isRowLoaded={({ index }) => !!data[index]}
    loadMoreRows={fetchMore}
    rowCount={hasNext ? data.length + 1 : data.length}
  >
    {({ onRowsRendered, registerChild }) => (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width < MIN_TABLE_WIDTH ? MIN_TABLE_WIDTH : width}
            height={height}
            headerHeight={40}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            onRowsRendered={onRowsRendered}
            rowRenderer={(props) => rowRenderer(props, data.length)}
            ref={registerChild}
            rowClassName="bg-white border-b border-gray-200"
          >
            {children({ height, width, cache })}
          </Table>
        )}
      </AutoSizer>
    )}
  </InfiniteLoader>
)

InfiniteScrollTable.propTypes = {
  data: PropTypes.array.isRequired,
  fetchMore: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
}

export default InfiniteScrollTable
