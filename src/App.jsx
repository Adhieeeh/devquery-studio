import React, { useState } from 'react';


const MOCK_DATABASE = {
  users: [
    { id: 101, name: 'Adhieeh Dev', role: 'Lead Architect', status: 'active', region: 'us-east' },
    { id: 102, name: 'Sarah Connor', role: 'Security SecOps', status: 'active', region: 'eu-west' },
    { id: 103, name: 'John Doe', role: 'Junior Frontend', status: 'suspended', region: 'us-east' },
    { id: 104, name: 'Elena Rostova', role: 'Data DevOps', status: 'active', region: 'ap-south' }
  ]
};

function App() {
 
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users WHERE status = 'active'");
  const [activeTab, setActiveTab] = useState('TABLE'); 
  
  
  const [traceLogs, setTraceLogs] = useState(['📋 Query parser database instance online. Engine initialized...']);

  
  const executeQueryPipeline = () => {
    const rawInput = sqlQuery.trim().replace(/\s+/g, ' ');
    
  
    if (!rawInput.toUpperCase().startsWith('SELECT')) {
      setTraceLogs(prev => [`❌ SYNTAX CRASH: Parser only supports SELECT operations inside this laboratory sandbox.`, ...prev]);
      return { columns: [], rows: [], json: [] };
    }

    try {
     
      const fromMatch = rawInput.toUpperCase().match(/FROM\s+(\w+)/);
      if (!fromMatch) {
        setTraceLogs(prev => [`❌ CONFIG FAULT: Explicit FROM keyword parameter target table is missing.`, ...prev]);
        return { columns: [], rows: [], json: [] };
      }
      
      const tableName = fromMatch[1].toLowerCase();
      const targetTable = MOCK_DATABASE[tableName];

      if (!targetTable) {
        setTraceLogs(prev => [` SCAN EXCEPTION: Table identity "${tableName}" not found in local catalog schema registers.`, ...prev]);
        return { columns: [], rows: [], json: [] };
      }

      let queryResults = [...targetTable];
      setTraceLogs(prev => [`🔍 Ingesting records from directory catalog table: "${tableName}"...`, ...prev]);

    
      const whereMatch = rawInput.toUpperCase().match(/WHERE\s+(.+)$/);
      if (whereMatch) {
        const whereClause = rawInput.substring(rawInput.toUpperCase().indexOf('WHERE') + 5).trim();
        
     
        const conditionMatch = whereClause.match(/(\w+)\s*=\s*['"]?([^'"]+)['"]?/);
        if (conditionMatch) {
          const fieldKey = conditionMatch[1].trim();
          const targetValue = conditionMatch[2].trim();

          queryResults = queryResults.filter(row => String(row[fieldKey]) === targetValue);
          setTraceLogs(prev => [`⚡ Executed conditional scan criteria filter array where [${fieldKey}] equals [${targetValue}]. Found ${queryResults.length} matches.`, ...prev]);
        }
      } else {
        setTraceLogs(prev => [` Scanning full sequential table array without conditional filtering bounds.`, ...prev]);
      }

      
      const selectClause = rawInput.substring(6, rawInput.toUpperCase().indexOf('FROM')).trim();
      let selectedColumns = Object.keys(targetTable[0]);

      if (selectClause !== '*') {
        const explicitFields = selectClause.split(',').map(f => f.trim());
        selectedColumns = selectedColumns.filter(col => explicitFields.includes(col));
      }

      
      const formattedRows = queryResults.map(row => {
        let dynamicItem = {};
        selectedColumns.forEach(col => { dynamicItem[col] = row[col]; });
        return dynamicItem;
      });

      setTraceLogs(prev => [` COMPILER SUCCESS: Query execution returned perfect output schema vectors.`, ...prev]);
      return { columns: selectedColumns, rows: formattedRows, json: queryResults };

    } catch (err) {
      setTraceLogs(prev => [`❌ SYSTEM COMPILER ABORT: ${err.message}`, ...prev]);
      return { columns: [], rows: [], json: [] };
    }
  };

 
  const { columns, rows, json } = executeQueryPipeline();

 
  const [copyFeedback, setCopyFeedback] = useState('📋 Copy Dataset Payload');
  const handleExportData = () => {
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
    setCopyFeedback('Payload Copied! ');
    setTimeout(() => setCopyFeedback(' Copy Dataset Payload'), 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px', fontFamily: 'monospace', backgroundColor: '#070a13', color: '#f8fafc', minHeight: '90vh' }}>
      
      
      <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '25px', marginBottom: '35px', gap: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#10b981', letterSpacing: '-0.5px' }}> DevQuery Relational Database Lab</h1>
          <p style={{ margin: '4px 0 0 0', color: '#475569', fontSize: '12px' }}>An interactive query compilation laboratory validating client-side structured schema logic pipelines.</p>
        </div>
        
        <button onClick={handleExportData} disabled={rows.length === 0} style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #10b981', color: '#10b981', borderRadius: '8px', fontWeight: 'bold', cursor: rows.length === 0 ? 'not-allowed' : 'pointer', fontSize: '13px', opacity: rows.length === 0 ? 0.3 : 1 }}>
          {copyFeedback}
        </button>
      </header>

      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        
       
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '13px', color: '#475569', textTransform: 'uppercase', margin: '0 0 12px 0' }}>SQL Query Command Editor Input</h3>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              style={{ width: '100%', height: '140px', padding: '16px', backgroundColor: '#070a13', border: '1px solid #1e293b', borderRadius: '12px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', resize: 'none', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ padding: '12px 14px', backgroundColor: '#070a13', borderRadius: '8px', borderLeft: '4px solid #3b82f6', fontSize: '11px', color: '#475569', lineHeight: '1.6' }}>
            <strong>Catalog Catalog Reference Tip:</strong> DevQuery simulates target values inside a <code>users</code> catalog table. Experiment with changing fields: <code>SELECT name, role FROM users WHERE region = 'us-east'</code>
          </div>

          
          <div>
            <h3 style={{ fontSize: '12px', color: '#475569', margin: '0 0 12px 0', textTransform: 'uppercase' }}>Pipeline Engine Runtime Trace Logs</h3>
            <div style={{ backgroundColor: '#070a13', borderRadius: '10px', padding: '15px', height: '120px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid #1e293b' }}>
              {traceLogs.map((log, i) => (
                <div key={i} style={{ fontSize: '11px', color: log.startsWith('❌') ? '#f43f5e' : log.startsWith('⚠️') ? '#fbbf24' : log.startsWith('🎉') ? '#34d399' : '#64748b' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '13px', color: '#475569', textTransform: 'uppercase', margin: '0' }}>Target Query Output Matrix View</h3>
            
          
            <div style={{ display: 'flex', gap: '4px' }}>
              {['TABLE', 'JSON'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === tab ? '#10b981' : '#1e293b', color: activeTab === tab ? '#070a13' : '#94a3b8' }}
                >
                  {tab === 'TABLE' ? 'Graphical Grid Data View' : 'Raw JSON Object Payload'}
                </button>
              ))}
            </div>
          </div>

        
          <div style={{ flexGrow: '1', backgroundColor: '#0f172a', border: '1px dashed #334155', borderRadius: '16px', padding: '20px', overflow: 'auto', minHeight: '320px' }}>
            
           
            {activeTab === 'TABLE' && rows.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1e293b' }}>
                    {columns.map(col => (
                      <th key={col} style={{ padding: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                      {columns.map(col => (
                        <td key={col} style={{ padding: '10px', color: '#cbd5e1' }}>{String(row[col])}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

           
            {activeTab === 'JSON' && rows.length > 0 && (
              <pre style={{ margin: '0', fontSize: '12px', color: '#34d399', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(rows, null, 2)}
              </pre>
            )}

            {rows.length === 0 && (
              <div style={{ color: '#475569', textAlign: 'center', marginTop: '60px', fontSize: '12px' }}>
                 Standby pipeline telemetry loops. Input standard validation command parameters to view catalog assets.
              </div>
            )}

          </div>
        </section>

      </div>

    </div>
  );
}

export default App;