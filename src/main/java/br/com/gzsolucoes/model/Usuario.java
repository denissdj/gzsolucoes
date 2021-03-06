package br.com.gzsolucoes.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.NotEmpty;

import br.com.gzsolucoes.enuns.EnumSexo;
import br.com.gzsolucoes.enuns.EnumStatusUsuario;

@Entity
@XmlRootElement
@Table(name = "TB_USUARIO")
@SequenceGenerator(name = "Sequence_usuario", sequenceName = "SEQ_TB_USUARIO", allocationSize = 1, initialValue = 1)
public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Sequence_usuario")
	private Long id;

	@NotEmpty
	@Size(max = 60)
	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private Integer idade;

	@Column(insertable = true, length =20, unique = false, updatable = true, nullable = false, name = "sexo")
	@Enumerated(EnumType.STRING)
	private EnumSexo sexo;

	@Column(insertable = true, length =20, unique = false, updatable = true, nullable = false, name = "status_usuario")
	@Enumerated(EnumType.STRING)
	private EnumStatusUsuario statusUsuario;

	@Column(insertable = true, unique = false, updatable = true, nullable = true, name = "dt_cadastro")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataCadastro;

	@Transient
	private String siglaSexo;

	@PrePersist
	public void validate() {

		this.dataCadastro = new Date();
		this.statusUsuario = EnumStatusUsuario.NAO_INFECTADO;
	}

	public Long getId() {

		return id;
	}

	public void setId(Long id) {

		this.id = id;
	}

	public String getNome() {

		return nome;
	}

	public void setNome(String nome) {

		this.nome = nome;
	}

	public Integer getIdade() {

		return idade;
	}

	public void setIdade(Integer idade) {

		this.idade = idade;
	}

	public EnumSexo getSexo() {

		return sexo;
	}

	public void setSexo(EnumSexo sexo) {

		this.sexo = sexo;
	}

	public EnumStatusUsuario getStatusUsuario() {

		return statusUsuario;
	}

	public void setStatusUsuario(EnumStatusUsuario statusUsuario) {

		this.statusUsuario = statusUsuario;
	}

	public Date getDataCadastro() {

		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {

		this.dataCadastro = dataCadastro;
	}

	public String getSiglaSexo() {

		return siglaSexo;
	}

	public void setSiglaSexo(String siglaSexo) {

		this.siglaSexo = siglaSexo;
	}

	@Override
	public int hashCode() {

		final int prime = 31;
		int result = 1;
		result = prime * result + ( ( id == null ) ? 0 : id.hashCode() );
		return result;
	}

	@Override
	public boolean equals(Object obj) {

		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Usuario other = (Usuario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}
