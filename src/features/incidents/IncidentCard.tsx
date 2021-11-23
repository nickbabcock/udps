import { ReportedIncident } from "./types";

export const IncidentCard: React.FC<ReportedIncident> = (incident) => {
  return (
    <div>
      <ul>
        <li>{incident.description}</li>
        <li>{incident.location}</li>
        <li>{`id: ${incident.id}`}</li>
        <li>{incident.narrative}</li>
        {incident.arrest && <li>{`Arrest: ${incident.arrest}`}</li>}
      </ul>

      <style jsx>{`
        div {
          border: solid 1px #f0f0f0;
          border-radius: 2px;
          padding: 24px;
          flex: 0 1 275px;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
      `}</style>
    </div>
  );
};
