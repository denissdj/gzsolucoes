package br.com.gzsolucoes.exception;

public class NegocioException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public NegocioException( final String msg ) {
		super(msg);
	}

}