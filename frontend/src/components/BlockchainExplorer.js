import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Form, Button } from 'react-bootstrap';
import { ethers } from 'ethers';

const BlockchainExplorer = ({ provider, contractAddress }) => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlockNumber = async () => {
      if (provider) {
        const number = await provider.getBlockNumber();
        setBlockNumber(number);
      }
    };
    
    fetchBlockNumber();
    
    // Poll for new blocks
    const interval = setInterval(fetchBlockNumber, 5000);
    return () => clearInterval(interval);
  }, [provider]);

  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const latestBlocks = [];
      const currentBlock = await provider.getBlockNumber();
      
      // Get the last 10 blocks or fewer if not enough blocks
      const blocksToFetch = Math.min(10, currentBlock + 1);
      
      for (let i = 0; i < blocksToFetch; i++) {
        const blockNumber = currentBlock - i;
        const block = await provider.getBlock(blockNumber);
        latestBlocks.push({
          number: block.number,
          hash: block.hash,
          timestamp: new Date(block.timestamp * 1000).toLocaleString(),
          transactions: block.transactions.length
        });
      }
      
      setBlocks(latestBlocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewBlock = async (blockNumber) => {
    setLoading(true);
    try {
      const block = await provider.getBlock(blockNumber);
      setSelectedBlock(block);
      
      // Get transaction details
      const txs = [];
      for (const txHash of block.transactions) {
        const tx = await provider.getTransaction(txHash);
        txs.push({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(tx.value)
        });
      }
      
      setTransactions(txs);
    } catch (error) {
      console.error("Error fetching block:", error);
    } finally {
      setLoading(false);
    }
  };

  const viewTransaction = async (txHash) => {
    setLoading(true);
    try {
      const tx = await provider.getTransaction(txHash);
      const receipt = await provider.getTransactionReceipt(txHash);
      
      setSelectedTx({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatEther(tx.value),
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status ? 'Success' : 'Failed',
        blockNumber: tx.blockNumber,
        data: tx.data
      });
    } catch (error) {
      console.error("Error fetching transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Blockchain Explorer</h2>
      <p>Current Block: {blockNumber}</p>
      
      <Button 
        variant="primary" 
        onClick={fetchBlocks} 
        disabled={loading || !provider}
        className="mb-3"
      >
        {loading ? 'Loading...' : 'View Recent Blocks'}
      </Button>
      
      {blocks.length > 0 && (
        <Card className="mb-4">
          <Card.Header>Recent Blocks</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Block #</th>
                  <th>Hash</th>
                  <th>Timestamp</th>
                  <th>Transactions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr key={block.number}>
                    <td>{block.number}</td>
                    <td>{`${block.hash.substring(0, 10)}...${block.hash.substring(58)}`}</td>
                    <td>{block.timestamp}</td>
                    <td>{block.transactions}</td>
                    <td>
                      <Button 
                        variant="info" 
                        size="sm" 
                        onClick={() => viewBlock(block.number)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
      
      {selectedBlock && (
        <Card className="mb-4">
          <Card.Header>Block #{selectedBlock.number}</Card.Header>
          <Card.Body>
            <p><strong>Hash:</strong> {selectedBlock.hash}</p>
            <p><strong>Parent Hash:</strong> {selectedBlock.parentHash}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedBlock.timestamp * 1000).toLocaleString()}</p>
            <p><strong>Transactions:</strong> {selectedBlock.transactions.length}</p>
            
            {transactions.length > 0 && (
              <>
                <h5 className="mt-3">Transactions</h5>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Hash</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Value (ETH)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.hash}>
                        <td>{`${tx.hash.substring(0, 10)}...${tx.hash.substring(58)}`}</td>
                        <td>{`${tx.from.substring(0, 6)}...${tx.from.substring(38)}`}</td>
                        <td>{`${tx.to.substring(0, 6)}...${tx.to.substring(38)}`}</td>
                        <td>{tx.value}</td>
                        <td>
                          <Button 
                            variant="info" 
                            size="sm" 
                            onClick={() => viewTransaction(tx.hash)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Card.Body>
        </Card>
      )}
      
      {selectedTx && (
        <Card className="mb-4">
          <Card.Header>Transaction Details</Card.Header>
          <Card.Body>
            <p><strong>Hash:</strong> {selectedTx.hash}</p>
            <p><strong>From:</strong> {selectedTx.from}</p>
            <p><strong>To:</strong> {selectedTx.to}</p>
            <p><strong>Value:</strong> {selectedTx.value} ETH</p>
            <p><strong>Gas Used:</strong> {selectedTx.gasUsed}</p>
            <p><strong>Status:</strong> {selectedTx.status}</p>
            <p><strong>Block:</strong> {selectedTx.blockNumber}</p>
            <div>
              <strong>Data:</strong>
              <pre style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px' }}>
                {selectedTx.data}
              </pre>
              <p className="text-muted">
                This data contains the encoded function call and parameters that were sent to the contract.
              </p>
            </div>
          </Card.Body>
        </Card>
      )}
      
      <Card className="mb-4">
        <Card.Header>Contract Information</Card.Header>
        <Card.Body>
          <p><strong>Contract Address:</strong> {contractAddress}</p>
          <p className="text-muted">
            All patient records are stored in this smart contract on the blockchain.
            Each transaction to this contract represents an operation like adding a patient or updating records.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlockchainExplorer; 