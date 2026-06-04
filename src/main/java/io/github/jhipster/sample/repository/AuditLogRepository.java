package io.github.jhipster.sample.repository;

import io.github.jhipster.sample.domain.AuditLog;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AuditLog entity.
 */
@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByEntityNameAndEntityIdOrderByPerformedAtDesc(String entityName, Long entityId);

    List<AuditLog> findByEntityNameOrderByPerformedAtDesc(String entityName);
}
