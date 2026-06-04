package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.Invoice;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Invoice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query("select invoice from Invoice invoice where invoice.bankAccount is not null")
    List<Invoice> findAllWithBankAccount();
}
