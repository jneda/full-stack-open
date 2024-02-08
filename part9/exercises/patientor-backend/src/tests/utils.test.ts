import { toNewEntry } from "../utils";
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";

describe("toNewEntry", () => {
  describe("healthcheck entry", () => {
    const newHealthCheckEntry: Omit<HealthCheckEntry, "id"> = {
      date: "2024-01-01",
      description: "Annual healthcheck",
      specialist: "MD Hut",
      healthCheckRating: 0,
      type: "HealthCheck",
    };

    describe("provided valid data for a new healthcheck entry", () => {
      it("should return a new healthcheck entry", () => {
        const actual = toNewEntry(newHealthCheckEntry);
        expect(actual).toEqual(newHealthCheckEntry);
      });
    });

    describe("provided invalid data for a new healthcheck entry", () => {
      describe("lacking a date", () => {
        it("should throw an error", () => {
          const newEntryWithoutDate = {
            ...newHealthCheckEntry,
          } as Partial<HealthCheckEntry>;
          delete newEntryWithoutDate.date;

          expect(() => toNewEntry(newEntryWithoutDate)).toThrow();
        });
      });

      describe("with an invalid date", () => {
        it("should throw an error", () => {
          const newEntryWithInvalidDate = {
            ...newHealthCheckEntry,
            date: "hello world",
          } as Partial<HealthCheckEntry>;

          expect(() => toNewEntry(newEntryWithInvalidDate)).toThrow();
        });
      });

      describe("lacking a description", () => {
        it("should throw an error", () => {
          const newEntryWithoutDescription = {
            ...newHealthCheckEntry,
          } as Partial<HealthCheckEntry>;
          delete newEntryWithoutDescription.description;

          expect(() => toNewEntry(newEntryWithoutDescription)).toThrow();
        });
      });

      describe("lacking a specialist", () => {
        it("should throw an error", () => {
          const newEntryWithoutSpecialist = {
            ...newHealthCheckEntry,
          } as Partial<HealthCheckEntry>;
          delete newEntryWithoutSpecialist.specialist;

          expect(() => toNewEntry(newEntryWithoutSpecialist)).toThrow();
        });
      });

      describe("lacking a health check rating", () => {
        it("should throw an error", () => {
          const newEntryWithoutHealthCheckRating = {
            ...newHealthCheckEntry,
          } as Partial<HealthCheckEntry>;
          delete newEntryWithoutHealthCheckRating.healthCheckRating;

          expect(() => toNewEntry(newEntryWithoutHealthCheckRating)).toThrow();
        });
      });

      describe("with an invalid health check rating", () => {
        it("should throw an error", () => {
          const newEntryWithInvalidHealthCheckRating = {
            ...newHealthCheckEntry,
            healthCheckRating: "hello",
          };

          expect(() =>
            toNewEntry(newEntryWithInvalidHealthCheckRating)
          ).toThrow();
        });
      });

      describe("lacking a type", () => {
        it("should throw an error", () => {
          const newEntryWithoutType = {
            ...newHealthCheckEntry,
          } as Partial<HealthCheckEntry>;
          delete newEntryWithoutType.type;

          expect(() => toNewEntry(newEntryWithoutType)).toThrow();
        });
      });

      describe("with an invalid type", () => {
        it("should throw an error", () => {
          const newEntryWithInvalidType = {
            ...newHealthCheckEntry,
            type: "hello",
          } as unknown;

          expect(() => toNewEntry(newEntryWithInvalidType)).toThrow();
        });
      });
    });
  });

  describe("hospital entry", () => {
    const newHospitalEntry: Omit<HospitalEntry, "id"> = {
      date: "2024-01-01",
      description: "Broken ankle",
      specialist: "MD Hut",
      discharge: {
        date: "2024-01-06",
        criteria: "Fracture reduced",
      },
      type: "Hospital",
    };

    describe("provided valid data for a new hospital entry", () => {
      it("should return a hospital entry", () => {
        const actual = toNewEntry(newHospitalEntry);

        expect(actual).toEqual(newHospitalEntry);
      });
    });

    describe("provided invalid data for a new hospital entry", () => {
      const newHospitalEntryWithoutDischarge = {
        ...newHospitalEntry,
      } as Partial<HospitalEntry>;
      delete newHospitalEntryWithoutDischarge.discharge;

      describe("lacking a discharge", () => {
        it("should throw an error", () => {
          expect(() => toNewEntry(newHospitalEntryWithoutDischarge)).toThrow();
        });
      });

      describe("lacking a discharge date", () => {
        it("should throw an error", () => {
          const testObject = {
            ...newHospitalEntryWithoutDischarge,
            discharge: {
              criteria: "Fracture reduced",
            },
          };

          expect(() => toNewEntry(testObject)).toThrow();
        });
      });

      describe("with an invalid discharge date", () => {
        it("should throw an error", () => {
          const testObject = {
            ...newHospitalEntryWithoutDischarge,
            discharge: {
              criteria: "Fracture reduced",
              date: "hello",
            },
          };

          expect(() => toNewEntry(testObject)).toThrow();
        });
      });

      describe("lacking discharge criteria", () => {
        it("should throw an error", () => {
          const testObject = {
            ...newHospitalEntryWithoutDischarge,
            discharge: {
              date: "2024-01-06",
            },
          };

          expect(() => toNewEntry(testObject)).toThrow();
        });
      });
    });
  });

  describe("occupational healthcare entry", () => {
    const occupationalHealthcareEntry: Omit<OccupationalHealthcareEntry, "id"> =
      {
        date: "2024-01-01",
        description: "Broken ankle",
        specialist: "MD Hut",
        type: "OccupationalHealthcare",
        employerName: "FBI",
      };

    describe("provided valid data for a new occupational healthcare entry", () => {
      it("should return a occupational healthcare entry", () => {
        const actual = toNewEntry(occupationalHealthcareEntry);
        expect(actual).toEqual(occupationalHealthcareEntry);
      });
    });

    describe("provided invalid data for a new occupational healthcare entry", () => {
      describe("lacking an employer name", () => {
        it("should throw an error", () => {
          const testObject = {
            ...occupationalHealthcareEntry,
          } as Partial<OccupationalHealthcareEntry>;
          delete testObject.employerName;

          expect(() => toNewEntry(testObject)).toThrow();
        });
      });

      describe("with an invalid employer name", () => {
        it("should throw an error", () => {
          const testObject = {
            ...occupationalHealthcareEntry,
            employerName: 42,
          } as unknown;

          expect(() => toNewEntry(testObject)).toThrow();
        });
      });
    });
  });
});
