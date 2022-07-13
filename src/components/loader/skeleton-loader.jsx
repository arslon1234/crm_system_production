import React from "react";
import Table from "react-skeleton"

export default function SkeletonLoader({count}) {
    return (
            <tr>
                {count > 0 && <th><Table height={"20px"}/></th>}
                {count > 1 && <th><Table height={"20px"}/></th>}
                {count > 2 && <th><Table height={"20px"}/></th>}
                {count > 3 && <th><Table height={"20px"}/></th>}
                {count > 4 && <th><Table height={"20px"}/></th>}
                {count > 5 && <th><Table height={"20px"}/></th>}
                {count > 7 && <th><Table height={"20px"}/></th>}
                {count > 8 && <th><Table height={"20px"}/></th>}
                {count > 9 && <th><Table height={"20px"}/></th>}
                {count > 10 && <th><Table height={"20px"}/></th>}
                {count > 11 && <th><Table height={"20px"}/></th>}
                {count > 12 && <th><Table height={"20px"}/></th>}
                {count > 13 && <th><Table height={"20px"}/></th>}
                {count > 14 && <th><Table height={"20px"}/></th>}
                {count > 15 && <th><Table height={"20px"}/></th>}
            </tr>
    )
}
