DROP TABLE IF EXISTS ordem_servico;
DROP TABLE IF EXISTS equipamento;
DROP TABLE IF EXISTS tecnico;

CREATE TABLE tecnico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT,
    telefone TEXT
);

CREATE TABLE equipamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    numero_serie TEXT,
    modelo TEXT
);

CREATE TABLE ordem_servico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    status TEXT NOT NULL,
    prioridade TEXT,
    data_abertura TEXT,
    observacoes TEXT,
    tecnico_id INTEGER,
    equipamento_id INTEGER,

    FOREIGN KEY (tecnico_id) REFERENCES tecnico(id),
    FOREIGN KEY (equipamento_id) REFERENCES equipamento(id)
);

INSERT INTO tecnico (nome, email, telefone) VALUES
('João Silva', 'joao.silva@email.com', '(11) 99999-0001'),
('Maria Souza', 'maria.souza@email.com', '(11) 99999-0002'),
('Carlos Lima', 'carlos.lima@email.com', '(11) 99999-0003');

INSERT INTO equipamento (nome, numero_serie, modelo) VALUES
('Impressora HP LaserJet 1020', 'HP1020-001', 'LaserJet 1020'),
('PC Dell Inspiron 15', 'DELL-INS15-002', 'Inspiron 15'),
('Monitor LG 24MK430', 'LG24-003', '24MK430'),
('Teclado Logitech K120', 'LOG-K120-004', 'K120');

INSERT INTO ordem_servico (
    descricao,
    status,
    prioridade,
    data_abertura,
    observacoes,
    tecnico_id,
    equipamento_id
) VALUES
('Impressora não está imprimindo', 'Em andamento', 'Média', '2026-04-24', 'Verificar cartucho e fila de impressão.', 1, 1),
('Computador não liga', 'Aguardando peças', 'Alta', '2026-04-22', 'Possível problema na fonte.', 2, 2),
('Tela com manchas', 'Finalizado', 'Baixa', '2026-04-20', 'Equipamento testado e finalizado.', 3, 3);