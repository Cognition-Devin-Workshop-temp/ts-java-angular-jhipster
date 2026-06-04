package io.github.jhipster.sample.service;

import io.github.jhipster.sample.config.Constants;
import io.github.jhipster.sample.domain.AuditLog;
import io.github.jhipster.sample.domain.enumeration.AuditAction;
import io.github.jhipster.sample.repository.AuditLogRepository;
import io.github.jhipster.sample.security.SecurityUtils;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for recording audit log entries for CRUD operations.
 */
@Service
@Transactional
public class AuditLogService {

    private static final Logger LOG = LoggerFactory.getLogger(AuditLogService.class);

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    /**
     * Record an audit log entry.
     *
     * @param action the CRUD action performed.
     * @param entityName the name of the entity.
     * @param entityId the ID of the entity.
     * @param details optional details about the operation.
     */
    public void log(AuditAction action, String entityName, Long entityId, String details) {
        String user = SecurityUtils.getCurrentUserLogin().orElse(Constants.SYSTEM);
        AuditLog auditLog = new AuditLog()
            .action(action)
            .entityName(entityName)
            .entityId(entityId)
            .performedBy(user)
            .performedAt(Instant.now())
            .details(details);
        auditLogRepository.save(auditLog);
        LOG.info("AUDIT: {} {} [id={}] by {} - {}", action, entityName, entityId, user, details);
    }

    /**
     * Record an audit log entry without details.
     */
    public void log(AuditAction action, String entityName, Long entityId) {
        log(action, entityName, entityId, null);
    }

    /**
     * Get audit logs for a specific entity instance.
     */
    @Transactional(readOnly = true)
    public List<AuditLog> getLogsForEntity(String entityName, Long entityId) {
        return auditLogRepository.findByEntityNameAndEntityIdOrderByPerformedAtDesc(entityName, entityId);
    }

    /**
     * Get all audit logs for a given entity type.
     */
    @Transactional(readOnly = true)
    public List<AuditLog> getLogsForEntityType(String entityName) {
        return auditLogRepository.findByEntityNameOrderByPerformedAtDesc(entityName);
    }
}
