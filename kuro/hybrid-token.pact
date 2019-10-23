(module hybrid-token GOVERNANCE

  (defcap GOVERNANCE ()
    true)

  (defschema token-table-schema
    guard:guard
    balance:decimal
  )

  (defschema tx-schema
    account:string
    amount:decimal
    status:string
  )

  (deftable token-table:{token-table-schema})
  (deftable tx-table:{tx-schema})

  (defconst TX_OPEN:string "open")
  (defconst TX_CLOSED:string "closed")
  ;how do i reject a tx?? not enough balance compared to what requested?
  (defconst TX_REJECTED:string "rejected")

  ;TOTAL SUPPLY 1 million tokens
  (defconst TOTAL_SUPPLY:decimal 1000000.0)

  ;module-guard account
  (defconst ADMIN_ACCOUNT:string "ht-admin")
  (defun ht-guard:guard () (create-module-guard ADMIN_ACCOUNT))


;need to figure out this admin stuff after
  (defcap ADMIN ()
    "makes sure only contract owner can make important function calls"
    ; need to figure out how to enforce this guard here... there is no coin contract
    ; may just need to be a good old read-keyset
    true
  )

  (defcap REGISTERED_USER (account:string)
    "makes sure user's guard matches"
    ;;look up user in token-table table -> guard gets passed from cw contract
    true
  )

  (defun transfer (sender:string receiver:string amount:decimal)
    @doc "allow users to send money to each other \
    \ mimics chainweb coin contract"
    (with-capability (REGISTERED_USER sender)
        (enforce (not (= sender receiver))
          "sender cannot be the receiver of a transfer")
        (enforce (> amount 0.0)
          "transfer amount must be positive")
        (with-read token-table sender
          {"balance":= balance-sender}
          (enforce (>= balance-sender amount) "insufficent hybrid tokens in your account. Please purchase more.")
          (with-read token-table receiver
            {"balance":= balance-receiver}
            (update token-table sender
              {"balance": (- balance-sender amount)})
            (update token-table receiver
              {"balance": (+ balance-receiver amount)})
          )
        )
    )
  )

  (defun transfer-to-cw (account:string amount:decimal)
    @doc "user initates transfer of balance to chainweb"
    (with-capability (REGISTERED_USER account)
      (with-read token-table account
        {"ht-balance":= balance}
        (enforce (>= balance amount) "amount must be less than your current balance")
        (enforce (> amount 0.0) "amount must be positive")
        ;;create a uniqueID -> account + timestamp
        (let* ((ts (at "block-time" (chain-data)))
            (id (format "{}-{}" [account, ts])))
        (insert tx-table id
          {"account": account,
          "amount": amount,
          "status": TX_OPEN})
        ;return some info to user
        (format "Confirmation that your request ({}) is being processed..." [id])
        )
      )
    )
  )

  (defun create-account (account:string guard:guard)
    @doc "ADMIN ONLY: creates an account for a new user of Kuro"
    (with-capability (ADMIN)
      (insert token-table account
        {"balance": 0.0,
        "guard": guard}
      )
    )
  )

  (defun credit-ht (account:string amount:decimal)
    @doc "ADMIN ONLY: admin credits user account from input from chainweb"
    (with-capability (ADMIN)
      (with-read token-table account
        {"balance":= balance-user}
        (with-read token-table "admin"
          {"balance":= balance-admin}
          (update token-table account
            {"balance": (+ balance-user amount)})
          (update token-table "admin"
            {"balance": (- balance-admin amount)})
        )
      )
    )
  )

  (defun create-and-credit-ht (account:string guard:guard amount:decimal)
    @doc "ADMIN ONLY: admin credits and creates account from input from chainweb"
    (with-capability (ADMIN)
      (create-account account guard)
      (with-read token-table account
        {"balance":= balance-user}
        (with-read token-table "admin"
          {"balance":= balance-admin}
          (update token-table account
            {"balance": (+ balance-user amount)})
          (update token-table "admin"
            {"balance": (- balance-admin amount)})
        )
      )
    )
  )

  (defun debit-ht (account:string amount:decimal)
    @doc "ADMIN ONLY: admin debits user when he cashes out from Kuro"
    (with-capability (ADMIN)
      (with-read token-table account
        {"balance":= balance-user}
        (with-read token-table "admin"
          {"balance":= balance-admin}
          (enforce (>= balance-user amount) "user does not have enough balance")
          (update token-table account
            {"balance": (- balance-user amount)})
          (update token-table "admin"
            {"balance": (+ balance-admin amount)})
        )
      )
    )
  )

  ;intended front-end use: (map (hybrid-token.get-tx) (hybrid-token.get-tx-keys))
  (defun get-tx-keys ()
    @doc "ADMIN ONLY: see who needs to be credited on either chain \
    \ can potentially encypt users info??"
    ;do i need ADMIN cap here, anyone can access this db in theory
    (with-capability (ADMIN)
      (keys tx-table)
    )
  )
  (defun get-tx (id:string)
    @doc "for user or admin to check status of a tx"
    (read tx-table id)
  )

  (defun confirm-transfer-to-cw (id:string)
    @doc "ADMIN ONLY: change status when interchain transfer complete"
    (with-capability (ADMIN)
      (update tx-table id
        {"status": TX_CLOSED})
    )
  )

  (defun reject-transfer-to-cw (id:string)
    @doc "ADMIN ONLY: change status when debit-ht gets rejected"
    (with-capability (ADMIN)
      (update tx-table id
        {"status": TX_REJECTED})
    )
  )

  (defun init-admin-account ()
    @doc "ADMIN ONLY: init admin account --> ONE TIME ONLY FUNCTION"
    (with-capability (ADMIN)
      (insert token-table "admin" {
        "guard": (ht-guard),
        "balance": TOTAL_SUPPLY}
      )
    )
  )

  (defun get-balance (account:string)
    (with-read token-table account
      {"balance":= balance}
      balance
    )
  )

)

(create-table token-table)
(create-table tx-table)
(init-admin-account)