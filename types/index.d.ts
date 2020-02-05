interface MnemonicPassword {
  mnemonic: string
  passphrase: string
}

interface RawKeyStore {
  publicKey: Uint8Array
  privateKey: Uint8Array
  keyType: string
}

interface KeyStore {
  publicKey: string
  privateKey: string
  pkh: string
  keyType: string
  mnemonic: string
}

interface SignObject {
  message: string
  privateKey: string
}

interface VerifyObject {
  signature: string
  message: string
  publicKey: string
}

interface ContractStorage {
  bignum: string
  unistring: string
}

interface Contract {
  balance: string
  delegate: string
  script: string
  counter: string
  signature: string
}

interface TransactionParam {
  source: string
  destination: string
  amount: string
}

interface TransactionObject {
  contractAddress: string
  from: string
  keys: string
  amount: string
  parameter: string
  fee: string
  gasLimit?: string
  storageLimit?: string
  revealFee?: string
}

interface Operation {
  kind: string
  source: string
  fee: string
  counter: string
  gas_limit: string
  storage_limit: string
  amount: string
  destination: string
}

interface OperationMessage {
  branch: string
  contents: Operation[]
}

interface ConstantsObject {
  proof_of_work_nonce_size: number
  nonce_length: number
  max_revelations_per_block: number
  max_operation_data_length: number
  max_proposals_per_delegate: number
  preserved_cycles: number
  blocks_per_cycle: number
  blocks_per_commitment: number
  blocks_per_roll_snapshot: number
  blocks_per_voting_period: number
  time_between_blocks: Array<string>
  endorsers_per_block: number
  hard_gas_limit_per_operation: string
  hard_gas_limit_per_block: string
  proof_of_work_threshold: string
  tokens_per_roll: string
  michelson_maximum_type_size: number
  seed_nonce_revelation_tip: string
  origination_size: number
  block_security_deposit: string
  endorsement_security_deposit: string
  block_reward: string
  endorsement_reward: string
  cost_per_byte: string
  hard_storage_limit_per_operation: string
  test_chain_duration: string
  quorum_min: number
  quorum_max: number
  min_proposal_quorum: number
  initial_endorsers: number
  delay_per_missing_endorsement: string
}

interface BootstrappedObject {
  block: string
  timestamp: string
}
