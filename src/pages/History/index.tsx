import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Task history</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Technical debit fixing</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Technical debit fixing</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Ongoing</Status>
              </td>
            </tr>
            <tr>
              <td>Technical debit fixing</td>
              <td>25 minutes</td>
              <td>2 months ago</td>
              <td>
                <Status statusColor="green">Ongoing</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
