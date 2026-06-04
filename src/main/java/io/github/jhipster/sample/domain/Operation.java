package io.github.jhipster.sample.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
@Schema(description = "A financial operation (transaction) linked to a bank account.")
public class Operation implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    @Schema(description = "Unique identifier", example = "1", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    @Schema(description = "Date and time of the operation", requiredMode = Schema.RequiredMode.REQUIRED, example = "2024-01-15T10:30:00Z")
    private Instant date;

    @Column(name = "description")
    @Schema(description = "Optional description of the operation", example = "Monthly salary")
    private String description;

    @NotNull
    @Column(name = "amount", precision = 21, scale = 2, nullable = false)
    @Schema(description = "Transaction amount", requiredMode = Schema.RequiredMode.REQUIRED, example = "250.00")
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "operations" }, allowSetters = true)
    private BankAccount bankAccount;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_operation__label",
        joinColumns = @JoinColumn(name = "operation_id"),
        inverseJoinColumns = @JoinColumn(name = "label_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "operations" }, allowSetters = true)
    private Set<Label> labels = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Operation id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return this.date;
    }

    public Operation date(Instant date) {
        this.setDate(date);
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getDescription() {
        return this.description;
    }

    public Operation description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return this.amount;
    }

    public Operation amount(BigDecimal amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BankAccount getBankAccount() {
        return this.bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Operation bankAccount(BankAccount bankAccount) {
        this.setBankAccount(bankAccount);
        return this;
    }

    public Set<Label> getLabels() {
        return this.labels;
    }

    public void setLabels(Set<Label> labels) {
        this.labels = labels;
    }

    public Operation labels(Set<Label> labels) {
        this.setLabels(labels);
        return this;
    }

    public Operation addLabel(Label label) {
        this.labels.add(label);
        return this;
    }

    public Operation removeLabel(Label label) {
        this.labels.remove(label);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Operation)) {
            return false;
        }
        return getId() != null && getId().equals(((Operation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
